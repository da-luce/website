<script lang="ts">
    import { onMount } from "svelte";
    import { createShaderProgram } from "../../scripts/gl_utils";
    import {
        vsGradient,
        fsGradient,
        vsNoise,
        fsNoise,
    } from "../../scripts/shaders";
    import { throttle } from "../../scripts/throttle";

    // Settings
    const numPoints = 5;
    const minSpeed = 0.002;
    const maxSpeed = 0.001;

    // Existing global variables for mouse position
    let mouseX = 0;
    let mouseY = 0;

    type color = [number, number, number];
    interface Point {
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: color;
    }

    let canvas: HTMLCanvasElement;
    let points: Array<Point> = [];

    const colorPalletteRGB: Array<color> = [
        [1, 52, 77],
        [3, 12, 29],
        [3, 12, 29],
        [3, 12, 29],
        [3, 12, 29],
        [3, 12, 29],
    ];

    const normalizeColor = (color: color): color => {
        return color.map((c) => c / 255) as color;
    };

    const colorPalletteNorm: Array<color> =
        colorPalletteRGB.map(normalizeColor);

    // Initializes and returns points with random positions and velocities
    /**
     * Initializes a set of points with random positions, velocities, and colors.
     * @returns {Array<Point>} - An array of points with properties: x, y, vx, vy,
     * color.
     */
    const initializePoints = (): Array<Point> => {
        let pointsLocal: Array<Point> = [];
        for (let i = 0; i < numPoints; i++) {
            // Generate a random speed within the range [minSpeed, maxSpeed]
            let speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
            let speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);

            // Randomly assign a direction (positive or negative) to the speeds
            speedX *= Math.random() < 0.5 ? -1 : 1;
            speedY *= Math.random() < 0.5 ? -1 : 1;

            pointsLocal.push({
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1,
                vx: speedX,
                vy: speedY,
                color: colorPalletteNorm[
                    Math.floor(Math.random() * colorPalletteNorm.length)
                ],
            });
        }

        // Ensure we have at least one point with the first defined color
        pointsLocal[0].color = colorPalletteNorm[0];

        return pointsLocal;
    };

    // Update the positions of the points and handle boundary collisions
    const updatePoints = () => {
        points = points.map((point) => {
            let newX = point.x + point.vx;
            let newY = point.y + point.vy;

            // Reverse the velocity if the point hits the boundary
            if (newX <= -1 || newX >= 1) point.vx *= -1;
            if (newY <= -1 || newY >= 1) point.vy *= -1;

            // Update position considering potential velocity reversal
            return {
                ...point,
                x: newX,
                y: newY,
            };
        });

        // Make the first point follow the mouse smoothly
        let followPoint = points[0];
        const lerpFactor = 0.02; // Adjust this value for smoother or faster movement
        followPoint.x += (mouseX - followPoint.x) * lerpFactor;
        followPoint.y += (mouseY - followPoint.y) * lerpFactor;
    };

    const initTexture = (gl: WebGLRenderingContext): WebGLTexture => {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            canvas.width,
            canvas.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null,
        );

        // Set texture parameters for NPOT texture
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        return texture;
    };

    const initFramebuffer = (
        gl: WebGLRenderingContext,
        texture: WebGLTexture,
    ): WebGLFramebuffer => {
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0,
        );
        return framebuffer;
    };

    const resizeCanvas = (
        gl: WebGLRenderingContext,
        spGradient: WebGLProgram,
        texture,
        framebuffer,
    ) => {
        if (!canvas) {
            return;
        }

        // Resize canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Set viewport
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Resize the texture
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            canvas.width,
            canvas.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null,
        );

        // Resize the framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0,
        );

        // Update resolution
        gl.useProgram(spGradient);
        const resolutionLocation = gl.getUniformLocation(
            spGradient,
            "u_resolution",
        );
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    const gradientPass = (
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        framebuffer: WebGLFramebuffer,
    ) => {
        // Render to the custom framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.useProgram(program);

        // Pass new information to uniforms
        // * Resolution only changes on resize
        // * Color information is constant
        const pointsLocation = gl.getUniformLocation(program, "u_points");

        gl.uniform2fv(
            pointsLocation,
            new Float32Array(points.flatMap((p) => [p.x, p.y])),
        );

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const noisePass = (
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        texture: WebGLTexture,
    ) => {
        // Render to the default framebuffer (screen)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(program);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(gl.getUniformLocation(program, "u_firstPassTexture"), 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const initMesh = (gl: WebGLRenderingContext, program: WebGLProgram) => {
        // Handle vertex positions for fullscreen quad
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW,
        );
        gl.enableVertexAttribArray(
            gl.getAttribLocation(program, "aVertexPosition"),
        );
        gl.vertexAttribPointer(
            gl.getAttribLocation(program, "aVertexPosition"),
            2,
            gl.FLOAT,
            false,
            0,
            0,
        );
    };

    const initGradient = (gl: WebGLRenderingContext): WebGLProgram => {
        // Create shader program
        const spGradient = createShaderProgram(
            gl,
            vsGradient,
            fsGradient(numPoints),
        );

        // Link it
        gl.useProgram(spGradient);

        // Put color information into uniforms, as it is contant

        const redsLocation = gl.getUniformLocation(spGradient, "u_reds");
        const greensLocation = gl.getUniformLocation(spGradient, "u_greens");
        const bluesLocation = gl.getUniformLocation(spGradient, "u_blues");

        const reds = new Float32Array(numPoints);
        const greens = new Float32Array(numPoints);
        const blues = new Float32Array(numPoints);

        points.forEach((point, index) => {
            reds[index] = point.color[0];
            greens[index] = point.color[1];
            blues[index] = point.color[2];
        });

        gl.uniform1fv(redsLocation, reds);
        gl.uniform1fv(greensLocation, greens);
        gl.uniform1fv(bluesLocation, blues);

        return spGradient;
    };

    onMount(() => {
        // Initialize WebGL
        const gl = canvas.getContext("webgl");
        if (!gl) {
            alert(
                "Unable to initialize WebGL. Your browser may not support it.",
            );
            return;
        }

        // Initialize points
        points = initializePoints();

        // Create shader programs
        const spGradient = initGradient(gl);
        const spNoise = createShaderProgram(gl, vsNoise, fsNoise);

        // ???
        initMesh(gl, spGradient);

        // Create texture
        const texture = initTexture(gl);
        const framebuffer = initFramebuffer(gl, texture);

        const render = () => {
            // Canvas may not exist when updating shaders. Avoid errors.
            if (!canvas) {
                return;
            }

            // Update point locations
            updatePoints();

            gradientPass(gl, spGradient, framebuffer);

            noisePass(gl, spNoise, texture);

            // Clear the screen
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            // Animate
            requestAnimationFrame(render);
        };

        resizeCanvas(gl, spGradient, texture, framebuffer); // Set initial size

        // Add window resize listener
        window.addEventListener("resize", () => {
            resizeCanvas(gl, spGradient, texture, framebuffer);
        });

        const mouseHandler = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        };

        const throttledMouseHandler = (event: MouseEvent) => {
            throttle(mouseHandler(event), 100);
        };

        // Add window mousemove
        window.addEventListener("mousemove", throttledMouseHandler);

        render();

        render();
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        display: block;
        width: 100vw;
        height: 100vh;
    }
</style>
