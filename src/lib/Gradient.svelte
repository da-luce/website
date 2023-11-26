<script lang="ts">
    import { createShaderProgram } from "./gl_utils";
    import { onMount } from "svelte";

    // --- Constants and Type Definitions ---
    const numPoints = 5;
    const minSpeed = 0.002;
    const maxSpeed = 0.001;
    const smoothness = 0.0001;
    type color = [number, number, number];
    interface Point {
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: color;
    }

    // --- Color Palette ---
    const colorPalletteRGB: Array<color> = [
        // Blues
        // [147, 235, 239],
        // [126, 194, 243],
        // [102, 149, 248],
        // [97, 140, 249],
        // [84, 115, 251],
        // [75, 98, 253],
        // Red
        // [200, 100, 100],
        // Black
        // [255, 255, 255],
        // [40, 40, 40],
        // [0, 0, 0],
        // [0, 0, 0],
        // [0, 0, 0],
        // [0, 0, 0],
        // [0, 0, 0],
        // Dark
        [1, 52, 77],
        [3, 12, 29],
        [3, 12, 29],
        [3, 12, 29],
        [3, 12, 29],
        [3, 12, 29],
        // Others
        // [143, 191, 255],
        // [180, 180, 254],
        // [225, 164, 250],
        // [255, 148, 223],
        // [255, 134, 181],
        // [255, 132, 132],
    ];

    // --- Helper Functions ---
    function normalizeColor(color: color): color {
        return color.map((c) => c / 255) as color;
    }

    const colorPalletteNorm: Array<color> =
        colorPalletteRGB.map(normalizeColor);

    function applyRepulsionForce(
        pointA,
        pointB,
        repulsionStrength,
        repulsionDistance
    ) {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionDistance && distance > 0) {
            const forceX = (dx / distance) * repulsionStrength;
            const forceY = (dy / distance) * repulsionStrength;

            pointA.vx += forceX;
            pointA.vy += forceY;
            pointB.vx -= forceX;
            pointB.vy -= forceY;
        }
    }

    /**
     * Initializes a set of points with random positions, velocities, and colors.
     * @returns {Array<Point>} - An array of points with properties: x, y, vx, vy,
     * color.
     */
    function initializePoints(): Array<Point> {
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

        pointsLocal[0].color = colorPalletteNorm[0];
        return pointsLocal;
    }

    // Existing global variables for mouse position
    let mouseX = 0;
    let mouseY = 0;

    const baseVelocity = 0.005;
    const frictionCoefficient = 0.95;

    function applyFriction(point) {
        const currentSpeed = Math.sqrt(
            point.vx * point.vx + point.vy * point.vy
        );

        if (currentSpeed > baseVelocity) {
            point.vx *= frictionCoefficient;
            point.vy *= frictionCoefficient;

            // Recheck speed after applying friction
            const newSpeed = Math.sqrt(
                point.vx * point.vx + point.vy * point.vy
            );
            if (newSpeed < baseVelocity) {
                // Scale velocity up to base velocity
                const scale = baseVelocity / newSpeed;
                point.vx *= scale;
                point.vy *= scale;
            }
        }
    }

    const updateVelocitiesAndPositions = (
        points: Array<Point>
    ): Array<Point> => {
        // for (let i = 0; i < points.length; i++) {
        //     for (let j = i + 1; j < points.length; j++) {
        //         applyRepulsionForce(points[i], points[j], 0.005, 0.1); // Adjust these values as needed
        //     }
        // }

        // Then apply friction to each point
        points.forEach(applyFriction);

        for (let i = 1; i < points.length; i++) {
            let point = points[i];

            // Update positions based on velocity
            point.x += point.vx;
            point.y += point.vy;

            // Reflect off boundaries
            if (point.x < -1.0 || point.x > 1.0) {
                point.vx *= -1;
            }
            if (point.y < -1.0 || point.y > 1.0) {
                point.vy *= -1;
            }
        }

        // Make the first point follow the mouse smoothly
        let followPoint = points[0];
        const lerpFactor = 0.05; // Adjust this value for smoother or faster movement
        followPoint.x += (mouseX - followPoint.x) * lerpFactor;
        followPoint.y += (mouseY - followPoint.y) * lerpFactor;

        return points;
    };

    const vsGradient = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }`;

    const vsNoise = `
        attribute vec4 aVertexPosition;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = aVertexPosition;
            v_texCoord = aVertexPosition.xy * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
        }`;

    const fsGradient = `
        #define MAX_POINTS ${numPoints}
        precision mediump float;

        uniform vec2 u_points[MAX_POINTS];
        uniform float u_reds[MAX_POINTS];
        uniform float u_greens[MAX_POINTS];
        uniform float u_blues[MAX_POINTS];
        uniform vec2 u_resolution;

        float w_i (in vec2 x, in vec2 x_i, in float p) {

            // Weird distance normalization
            vec2 displacement = x - x_i;
            displacement.x *= u_resolution.x / u_resolution.y;
            float distance = length(displacement);

            return pow(distance, -p);
        }

        float u (in vec2 x, in float p, in float vals[MAX_POINTS]) {
            float weight_sum = 0.0;
            float value_sum = 0.0;
            for (int i = 0; i < MAX_POINTS; ++i) {
                weight_sum += w_i (x, u_points[i], p) * vals[i]; // Subtract a constant value from this to achieve the "ball effect"
                value_sum += w_i (x, u_points[i], p);
            }
            return weight_sum > 0.0 ? weight_sum / value_sum: 0.0; // Avoid division by zero
        }  

        void main() {
            
            vec3 color = vec3(0.0, 0.0, 0.0); // Default to black
            float radius = 0.01; // Radius for visualizing points

            float p = 4.0;
            vec2 ndc_frag = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;

            float r = u(ndc_frag, p, u_reds);
            float g = u(ndc_frag, p, u_greens);
            float b = u(ndc_frag, p, u_blues);

            color = vec3(r,g,b);

            gl_FragColor = vec4(color, 1.0); // -0.1 adds a cool effect
        }`;

    // Second fragment shader (uses texture from first pass)
    const fsNoise = `
        precision mediump float;
        uniform sampler2D u_firstPassTexture;
        varying vec2 v_texCoord;

        // Function to create noise effect
        float noise(vec2 coord) {
            return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
            // Apply the noise effect to offset texture coordinates
            float n = noise(v_texCoord * 10.0); // Adjust the multiplier to control the noise frequency
            vec2 scatter = vec2(noise(v_texCoord + n), noise(v_texCoord - n)) * 0.025; // Offset magnitude

            // Offset the texture coordinates
            vec2 scatteredCoord = v_texCoord + scatter;

            // Sample the texture at the scattered coordinates
            vec4 scatteredColor = texture2D(u_firstPassTexture, scatteredCoord);

            // Output the final color
            gl_FragColor = scatteredColor;
        }`;

    // --- WebGL Initialization ---
    let gradientCanvas;

    function resizeCanvas() {
        if (gradientCanvas) {
            gradientCanvas.width = window.innerWidth;
            gradientCanvas.height = window.innerHeight;

            // Update any WebGL settings or redraw as needed
        }
    }

    onMount(() => {
        resizeCanvas(); // Set initial size

        // Add window resize listener
        window.addEventListener("resize", resizeCanvas);

        // Convert screen coordinates to WebGL coordinates
        function screenToWebGL(x, y, gradientCanvas) {
            return {
                x: (x / gradientCanvas.width) * 2 - 1,
                y: -((y / gradientCanvas.height) * 2 - 1),
            };
        }

        // Mouse move event listener
        gradientCanvas.addEventListener("mousemove", (event) => {
            const rect = gradientCanvas.getBoundingClientRect();
            const pos = screenToWebGL(
                event.clientX - rect.left,
                event.clientY - rect.top,
                gradientCanvas
            );
            mouseX = pos.x;
            mouseY = pos.y;
        });

        const gl = gradientCanvas.getContext("webgl");

        if (!gl) {
            alert(
                "Unable to initialize WebGL. Your browser may not support it."
            );
            throw new Error("WebGL not supported");
        }

        // --- Shader Compilation and Linking ---
        const spGradient = createShaderProgram(gl, vsGradient, fsGradient);
        const spNoise = createShaderProgram(gl, vsNoise, fsNoise);

        // --- Buffer and Attribute Setup ---
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(positions),
            gl.STATIC_DRAW
        );

        const positionAttributeLocation = gl.getAttribLocation(
            spGradient,
            "aVertexPosition"
        );
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(
            positionAttributeLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        // --- Uniform Locations ---
        const pointLocation = gl.getUniformLocation(spGradient, "u_points");
        const redLocation = gl.getUniformLocation(spGradient, "u_reds");
        const greenLocation = gl.getUniformLocation(spGradient, "u_greens");
        const blueLocation = gl.getUniformLocation(spGradient, "u_blues");
        const resolutionLocation = gl.getUniformLocation(
            spGradient,
            "u_resolution"
        );
        const timeLocation = gl.getUniformLocation(spGradient, "u_time");

        // Set the resolution uniform once
        gl.useProgram(spGradient);
        gl.uniform2f(resolutionLocation, window.innerWidth, window.innerHeight);

        // Create texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gradientCanvas.width,
            gradientCanvas.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        );

        // Set texture parameters for NPOT texture
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Create framebuffer
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0
        );

        // --- Points and Colors Setup ---
        let points: Array<Point> = initializePoints();

        // Initialize arrays for red, green, blue components
        let reds: number[] = [];
        let greens: number[] = [];
        let blues: number[] = [];

        for (let i = 0; i < points.length; i++) {
            reds.push(points[i].color[0]);
            greens.push(points[i].color[1]);
            blues.push(points[i].color[2]);
        }

        const gradient_pass = (gl: WebGLRenderingContext) => {
            // Render to the custom framebuffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.useProgram(spGradient);

            // Update uniforms
            const pointData = points.map((p) => [p.x, p.y]).flat();
            gl.uniform2fv(pointLocation, new Float32Array(pointData));
            gl.uniform1fv(redLocation, new Float32Array(reds));
            gl.uniform1fv(greenLocation, new Float32Array(greens));
            gl.uniform1fv(blueLocation, new Float32Array(blues));

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const noise_pass = (gl: WebGLRenderingContext) => {
            // Render to the default framebuffer (screen)
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.useProgram(spNoise);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(
                gl.getUniformLocation(spNoise, "u_firstPassTexture"),
                0
            );

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        // --- Render Loop ---
        const render = () => {
            points = updateVelocitiesAndPositions(points);
            gradient_pass(gl);
            noise_pass(gl);

            requestAnimationFrame(render);
        };

        render();
    });
</script>

<canvas bind:this={gradientCanvas}></canvas>
