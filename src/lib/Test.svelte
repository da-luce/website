<script lang="ts">
    import { onMount } from "svelte";
    import { createShaderProgram } from "./gl_utils";
    import { vsSource, fsSource } from "./shaders";

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
    export const numPoints: number = 10; // Export so we can use in shader

    const colorPalletteRGB: Array<color> = [
        [147, 235, 239],
        [126, 194, 243],
        [102, 149, 248],
        [97, 140, 249],
        [84, 115, 251],
        [75, 98, 253],
    ];

    function normalizeColor(color: color): color {
        return color.map((c) => c / 255) as color;
    }

    const colorPalletteNorm: Array<color> =
        colorPalletteRGB.map(normalizeColor);

    // Initializes and returns points with random positions and velocities
    function initializePoints() {
        let points = [];
        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * 2 - 1, // Between -1 and 1
                y: Math.random() * 2 - 1,
                vx: (Math.random() - 0.5) * 0.02, // Random velocity
                vy: (Math.random() - 0.5) * 0.02,
                color: colorPalletteNorm[
                    Math.floor(Math.random() * colorPalletteNorm.length)
                ],
            });
        }
        return points;
    }

    // Update the positions of the points and handle boundary collisions
    function updatePoints() {
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
    }

    function resizeCanvas(
        gl: WebGLRenderingContext,
        shaderProgram: WebGLProgram,
        resolutionLocation: WebGLUniformLocation,
    ) {
        if (!canvas) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.useProgram(shaderProgram);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    }

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

        // Create shader program
        const shaderProgram = createShaderProgram(
            gl,
            vsSource,
            fsSource(numPoints),
        );
        gl.useProgram(shaderProgram);

        // Handle vertex positions for fullscreen quad
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW,
        );
        gl.enableVertexAttribArray(
            gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        );
        gl.vertexAttribPointer(
            gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            2,
            gl.FLOAT,
            false,
            0,
            0,
        );

        // Constant uniform locations
        const pointsLocation = gl.getUniformLocation(shaderProgram, "u_points");
        const resolutionLocation = gl.getUniformLocation(
            shaderProgram,
            "u_resolution",
        );
        const redsLocation = gl.getUniformLocation(shaderProgram, "u_reds");
        const greensLocation = gl.getUniformLocation(shaderProgram, "u_greens");
        const bluesLocation = gl.getUniformLocation(shaderProgram, "u_blues");

        // Prepare color arrays
        const reds = new Float32Array(numPoints);
        const greens = new Float32Array(numPoints);
        const blues = new Float32Array(numPoints);

        points.forEach((point, index) => {
            reds[index] = point.color[0];
            greens[index] = point.color[1];
            blues[index] = point.color[2];
        });

        // Pass color information once. This does not change
        gl.uniform1fv(redsLocation, reds);
        gl.uniform1fv(greensLocation, greens);
        gl.uniform1fv(bluesLocation, blues);

        function render() {
            // Canvas may not exist when updating shaders. Avoid errors.
            if (!canvas) {
                return;
            }

            // Update point locations
            updatePoints();

            // Pass new information to uniforms
            // * Resolution only changes on resize
            // * Color information is constant
            gl.uniform2fv(
                pointsLocation,
                new Float32Array(points.flatMap((p) => [p.x, p.y])),
            );

            // Clear the screen
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            // Animate
            requestAnimationFrame(render);
        }

        resizeCanvas(gl, shaderProgram, resolutionLocation); // Set initial size

        // Add window resize listener
        window.addEventListener("resize", () => {
            resizeCanvas(gl, shaderProgram, resolutionLocation);
        });

        render();
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        display: block;
    }
</style>
