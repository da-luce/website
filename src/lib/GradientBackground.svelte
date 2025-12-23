<script lang="ts">
    import { onMount } from 'svelte'
    import { createShaderProgram } from '$scripts/gl_utils'
    import {
        vsGradient,
        fsGradient,
        vsNoise,
        fsNoise,
        vsWarp,
        fsWarp,
        vsPresent,
        fsPresent,
    } from '../scripts/shaders'
    import { throttle } from '../scripts/throttle'

    // Settings
    const numPoints = 4
    const minSpeed = 0.00002
    const maxSpeed = 0.0005
    const PIXEL_SCALE = 2 // 2 = chunky pixels, 4 = very chunky

    // Existing global variables for mouse position
    let mouseX = 0
    let mouseY = 0

    let shaderMouseX = 0
    let shaderMouseY = 0

    const leftBarrier = 0.8
    const rightBarrier = 1
    const topBarrier = 1
    const bottomBarrier = 0.6

    const lerpFactor = 0.05 // adjust for smoothness

    const updateMouseUniform = () => {
        // Interpolate for smooth movement
        shaderMouseX += (mouseX - shaderMouseX) * lerpFactor
        shaderMouseY += (mouseY - shaderMouseY) * lerpFactor
    }

    type color = [number, number, number]
    interface Point {
        x: number
        y: number
        vx: number
        vy: number
        color: color
    }

    let canvas: HTMLCanvasElement
    let points: Array<Point> = []

    const colorPalletteRGB: Array<color> = [
        // In RGB
        // #fc88e7,
        // #fa4882,
        // #fba834
        // convert to RGB here
        // [252, 136, 231],
        // [250, 72, 130],
        // [251, 168, 52],
        [102, 255, 217],
        [102, 217, 255],
        [102, 140, 255],
        [140, 102, 255],
    ]

    const normalizeColor = (color: color): color => {
        return color.map((c) => c / 255) as color
    }

    const colorPalletteNorm: Array<color> = colorPalletteRGB.map(normalizeColor)

    // Initializes and returns points with random positions and velocities
    /**
     * Initializes a set of points with random positions, velocities, and colors.
     * @returns {Array<Point>} - An array of points with properties: x, y, vx, vy,
     * color.
     */
    const initializePoints = (): Array<Point> => {
        let pointsLocal: Array<Point> = []
        for (let i = 0; i < numPoints; i++) {
            // Generate a random speed within the range [minSpeed, maxSpeed]
            let speedX = minSpeed + Math.random() * (maxSpeed - minSpeed)
            let speedY = minSpeed + Math.random() * (maxSpeed - minSpeed)

            // Randomly assign a direction (positive or negative) to the speeds
            speedX *= Math.random() < 0.5 ? -1 : 1
            speedY *= Math.random() < 0.5 ? -1 : 1

            // Make x and y inside the barriers
            let x = Math.random() * (rightBarrier - leftBarrier) + leftBarrier
            let y = Math.random() * (topBarrier - bottomBarrier) + bottomBarrier

            pointsLocal.push({
                x: x,
                y: y,
                vx: speedX,
                vy: speedY,
                color: colorPalletteNorm[
                    Math.floor(i % colorPalletteNorm.length)
                ],
            })
        }

        // Ensure we have at least one point with the first defined color
        pointsLocal[0].color = colorPalletteNorm[0]

        return pointsLocal
    }

    // Update the positions of the points and handle boundary collisions
    const updatePoints = () => {
        const repulsionStrength = 0.00002 // Adjust for stronger/weaker repulsion
        const repulsionRadius = 1.0 // Only repel if points are closer than this

        points = points.map((point, i) => {
            let newX = point.x + point.vx
            let newY = point.y + point.vy

            // Apply repulsion from other points
            for (let j = 0; j < points.length; j++) {
                if (i === j) continue
                const other = points[j]
                let dx = newX - other.x
                let dy = newY - other.y
                let distSq = dx * dx + dy * dy

                if (distSq < repulsionRadius * repulsionRadius && distSq > 0) {
                    let dist = Math.sqrt(distSq)
                    // repulsion vector magnitude inversely proportional to distance
                    let force = repulsionStrength / dist
                    dx /= dist // normalize
                    dy /= dist
                    newX += dx * force
                    newY += dy * force
                }
            }

            // Fix first and second points to corners
            if (i === 0) {
                newX = rightBarrier
                newY = topBarrier
            } else if (i === 1) {
                newX = rightBarrier
                newY = bottomBarrier
            }

            // Reverse velocity if hitting the barrier
            if (newX <= leftBarrier || newX >= rightBarrier) point.vx *= -1
            if (newY <= bottomBarrier || newY >= topBarrier) point.vy *= -1

            return {
                ...point,
                x: newX,
                y: newY,
            }
        })
    }

    const initTexture = (gl: WebGLRenderingContext): WebGLTexture => {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            canvas.width,
            canvas.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        )

        // Set texture parameters for NPOT texture
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

        gl.disable(gl.DITHER)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)

        // Use NEAREST for pixelated look -- don't blur?
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        return texture
    }

    const initFramebuffer = (
        gl: WebGLRenderingContext,
        texture: WebGLTexture
    ): WebGLFramebuffer => {
        const framebuffer = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0
        )
        return framebuffer
    }

    const resizeCanvas = (
        gl: WebGLRenderingContext,
        spGradient: WebGLProgram,
        texture,
        framebuffer
    ) => {
        if (!canvas) {
            return
        }

        // Resize canvas (accounting for device pixel ratio-works on Retina)
        const dpr = window.devicePixelRatio || 1
        const scale = PIXEL_SCALE
        const rect = canvas.getBoundingClientRect()
        const cssWidth = rect.width
        const cssHeight = rect.height

        canvas.style.width = cssWidth + 'px'
        canvas.style.height = cssHeight + 'px'

        // 🔥 intentionally lower internal resolution
        canvas.width = Math.floor((cssWidth * dpr) / scale)
        canvas.height = Math.floor((cssHeight * dpr) / scale)

        // Set viewport
        gl.viewport(0, 0, canvas.width, canvas.height)

        // Resize the texture
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            canvas.width,
            canvas.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        )

        // Resize the framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0
        )

        // Update resolution
        gl.useProgram(spGradient)
        const resolutionLocation = gl.getUniformLocation(
            spGradient,
            'u_resolution'
        )
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    }

    const gradientPass = (
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        inputTexture: WebGLTexture,
        outputFramebuffer: WebGLFramebuffer
    ) => {
        // Render to the custom framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, outputFramebuffer)
        gl.useProgram(program)

        // Pass new information to uniforms
        // * Resolution only changes on resize
        // * Color information is constant
        const pointsLocation = gl.getUniformLocation(program, 'u_points')
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse')

        gl.uniform2fv(
            pointsLocation,
            new Float32Array(points.flatMap((p) => [p.x, p.y]))
        )

        updateMouseUniform()
        gl.uniform2f(mouseLocation, shaderMouseX, shaderMouseY)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const noisePass = (
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        inputTexture: WebGLTexture,
        outputFramebuffer: WebGLFramebuffer
    ) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, outputFramebuffer)
        gl.useProgram(program)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, inputTexture)
        gl.uniform1i(gl.getUniformLocation(program, 'u_firstPassTexture'), 0)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const warpPass = (
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        inputTexture: WebGLTexture,
        outputFramebuffer: WebGLFramebuffer
    ) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, outputFramebuffer)
        gl.useProgram(program)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, inputTexture)
        gl.uniform1i(gl.getUniformLocation(program, 'u_firstPassTexture'), 0)

        const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
        gl.uniform2f(mouseLocation, shaderMouseX, shaderMouseY)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const presentPass = (
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        texture: WebGLTexture
    ) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.useProgram(program)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1i(gl.getUniformLocation(program, 'u_texture'), 0)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const initMesh = (gl: WebGLRenderingContext, program: WebGLProgram) => {
        // Handle vertex positions for fullscreen quad
        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        )
        gl.enableVertexAttribArray(
            gl.getAttribLocation(program, 'aVertexPosition')
        )
        gl.vertexAttribPointer(
            gl.getAttribLocation(program, 'aVertexPosition'),
            2,
            gl.FLOAT,
            false,
            0,
            0
        )
    }

    const initGradient = (gl: WebGLRenderingContext): WebGLProgram => {
        // Create shader program
        const spGradient = createShaderProgram(
            gl,
            vsGradient,
            fsGradient(numPoints)
        )

        // Link it
        gl.useProgram(spGradient)

        // Put color information into uniforms, as it is contant

        const redsLocation = gl.getUniformLocation(spGradient, 'u_reds')
        const greensLocation = gl.getUniformLocation(spGradient, 'u_greens')
        const bluesLocation = gl.getUniformLocation(spGradient, 'u_blues')
        const alphasLocation = gl.getUniformLocation(spGradient, 'u_alphas')

        const reds = new Float32Array(numPoints)
        const greens = new Float32Array(numPoints)
        const blues = new Float32Array(numPoints)
        const alphas = new Float32Array(numPoints)
        points.forEach((point, index) => {
            reds[index] = point.color[0]
            greens[index] = point.color[1]
            blues[index] = point.color[2]
            alphas[index] = 1.0 // Set alpha to fully opaque for all points
        })

        gl.uniform1fv(redsLocation, reds)
        gl.uniform1fv(greensLocation, greens)
        gl.uniform1fv(bluesLocation, blues)
        gl.uniform1fv(alphasLocation, alphas)

        return spGradient
    }

    onMount(() => {
        // Initialize WebGL
        const gl = canvas.getContext('webgl')
        if (!gl) {
            alert(
                'Unable to initialize WebGL. Your browser may not support it.'
            )
            return
        }

        // Initialize points
        points = initializePoints()

        // Create shader programs
        const spGradient = initGradient(gl)
        const spNoise = createShaderProgram(gl, vsNoise, fsNoise)
        const spWarp = createShaderProgram(gl, vsWarp, fsWarp)
        const spPresent = createShaderProgram(gl, vsPresent, fsPresent)

        // ???
        initMesh(gl, spGradient)
        initMesh(gl, spNoise)
        initMesh(gl, spWarp)
        initMesh(gl, spPresent)

        // Create textures
        const textureA = initTexture(gl)
        const textureB = initTexture(gl)
        const textureC = initTexture(gl)

        // Create framebuffers
        const framebufferA = initFramebuffer(gl, textureA)
        const framebufferB = initFramebuffer(gl, textureB)
        const framebufferC = initFramebuffer(gl, textureC)

        gl.clearColor(0, 0, 0, 0) // RGBA, alpha = 0 for transparency
        gl.clear(gl.COLOR_BUFFER_BIT)

        const render = () => {
            // Canvas may not exist when updating shaders. Avoid errors.
            if (!canvas) {
                return
            }

            // Update point locations
            updatePoints()

            // Gradient
            gradientPass(gl, spGradient, null, framebufferA)
            noisePass(gl, spNoise, textureA, framebufferB)
            presentPass(gl, spPresent, textureB, null)

            // Clear the screen
            // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            // gl.clear(gl.COLOR_BUFFER_BIT)
            // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

            // Animate
            requestAnimationFrame(render)
        }

        resizeCanvas(gl, spGradient, textureA, framebufferA) // Set initial size
        resizeCanvas(gl, spGradient, textureB, framebufferB)
        resizeCanvas(gl, spGradient, textureC, framebufferC)

        // Add window resize listener
        window.addEventListener('resize', () => {
            resizeCanvas(gl, spGradient, textureA, framebufferA)
        })

        const mouseHandler = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
        }

        const throttledMouseHandler = throttle((event: MouseEvent) => {
            mouseHandler(event)
        }, 100)

        // Add window mousemove
        window.addEventListener('mousemove', throttledMouseHandler)

        render()

        render()
    })
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 100vw;
        height: 200vh;
    }
</style>
