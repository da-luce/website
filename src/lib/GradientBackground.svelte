<script lang="ts">
    import { onMount } from 'svelte'
    import vsGradient from '$scripts/shaders/gradient.vert?raw'
    import fsGradient from '$scripts/shaders/gradient.frag?raw'
    import vsNoise from '$scripts/shaders/noise.vert?raw'
    import fsNoise from '$scripts/shaders/noise.frag?raw'
    import vsWarp from '$scripts/shaders/warp.vert?raw'
    import fsWarp from '$scripts/shaders/warp.frag?raw'
    import {
        GLPostPass,
        GLPostPipeline,
        createShaderProgram,
    } from '$scripts/gl_lib'
    import { throttle } from '$scripts/throttle'

    // Configurable props
    export let numPoints: number = 4
    export let leftBarrier: number = 0.8
    export let rightBarrier: number = 1.0
    export let topBarrier: number = 1.0
    export let bottomBarrier: number = 0.6
    export let fixedPoints: Array<{ index: number; x: number; y: number }> = [
        { index: 0, x: 1.0, y: 1.0 }, // top-right by default
        { index: 1, x: 1.0, y: 0.6 }, // bottom-right by default
    ]

    // Global constants
    const PIXEL_SCALE = 4 // Still yields good result and better performance
    const MOUSE_LERP = 0.02 // 0 < lerp < 1. Lower = slower & smoother

    // Warp effect settings
    const BASE_WARP_STRENGTH = 0.05
    const MOUSE_WARP_STRENGTH = 0.15
    const EFFECT_RADIUS = 0.25
    const TIME_SCALE = 0.2

    // Gradient settings
    const MIN_SPEED = 0.00002
    const MAX_SPEED = 0.0005

    // Noise settings
    // (currently not used, but can be adjusted in updateNoiseUniforms)
    const NOISE_STRENGTH = 0.0
    const NOISE_FREQ = 10.0

    // Dark mode colors (original vibrant colors)
    const PALETTE_DARK_RGB: Array<color> = [
        [102, 255, 217],
        [102, 217, 255],
        [102, 140, 255],
        [140, 102, 255],
    ]

    // Light mode colors (lighter, more subtle versions)
    const PALETTE_LIGHT_RGB: Array<color> = [
        [148, 255, 228],
        [148, 228, 255],
        [148, 174, 255],
        [175, 148, 255],
    ]

    // Detect if device is mobile/touch-enabled
    const isMobile = () => {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.innerWidth < 768
        )
    }

    // Existing global variables for mouse position
    let mouseX = 0
    let mouseY = 0

    let smoothMouseX = 0
    let smoothMouseY = 0

    const updatedMouseSmoothed = () => {
        // Interpolate for smooth movement
        smoothMouseX += (mouseX - smoothMouseX) * MOUSE_LERP
        smoothMouseY += (mouseY - smoothMouseY) * MOUSE_LERP
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

    const normalizeColor = (color: color): color => {
        return color.map((c) => c / 255) as color
    }

    // Detect current theme
    const isDarkMode = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Get the current color palette based on theme
    const getCurrentColorPalette = (): Array<color> => {
        const palette = isDarkMode() ? PALETTE_DARK_RGB : PALETTE_LIGHT_RGB
        return palette.map(normalizeColor)
    }

    let colorPaletteNorm: Array<color> = []

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
            let speedX = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)
            let speedY = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)

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
                color: colorPaletteNorm[
                    Math.floor(i % colorPaletteNorm.length)
                ],
            })
        }

        // Ensure we have at least one point with the first defined color
        pointsLocal[0].color = colorPaletteNorm[0]

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

            // Fix points based on fixedPoints configuration
            const fixedPoint = fixedPoints.find((fp) => fp.index === i)
            if (fixedPoint) {
                newX = fixedPoint.x
                newY = fixedPoint.y
            }

            // Reverse velocity if hitting the barrier
            if (newX <= leftBarrier) {
                newX = leftBarrier
                point.vx *= -1
            } else if (newX >= rightBarrier) {
                newX = rightBarrier
                point.vx *= -1
            }

            if (newY <= bottomBarrier) {
                newY = bottomBarrier
                point.vy *= -1
            } else if (newY >= topBarrier) {
                newY = topBarrier
                point.vy *= -1
            }

            return {
                ...point,
                x: newX,
                y: newY,
            }
        })
    }

    const updateGradientUniforms = (gradientPass: GLPostPass) => {
        gradientPass.setUniform(
            'u_points',
            new Float32Array(points.flatMap((p) => [p.x, p.y]))
        )
        gradientPass.setUniform('u_numPoints', points.length)
        gradientPass.setUniform('u_resolution', [canvas.width, canvas.height])
        gradientPass.setUniform(
            'u_reds',
            new Float32Array(points.map((p) => p.color[0]))
        )
        gradientPass.setUniform(
            'u_greens',
            new Float32Array(points.map((p) => p.color[1]))
        )
        gradientPass.setUniform(
            'u_blues',
            new Float32Array(points.map((p) => p.color[2]))
        )
        gradientPass.setUniform(
            'u_alphas',
            new Float32Array(points.map(() => 1.0))
        )
    }

    const updateNoiseUniforms = (noisePass: GLPostPass) => {
        noisePass.setUniform('u_strength', NOISE_STRENGTH)
        noisePass.setUniform('u_frequency', NOISE_FREQ)
    }

    const updateWarpUniforms = (warpPass: GLPostPass, time: number) => {
        if (!warpPass.hasUniform('u_mouse')) return
        warpPass.setUniform('u_mouse', [smoothMouseX, smoothMouseY])
        warpPass.setUniform('u_time', time)
        warpPass.setUniform('u_baseWarpStrength', BASE_WARP_STRENGTH)
        warpPass.setUniform('u_mouseWarpStrength', MOUSE_WARP_STRENGTH)
        warpPass.setUniform('u_effectRadius', EFFECT_RADIUS)
        warpPass.setUniform('u_timeScale', TIME_SCALE)
        warpPass.setUniform('u_resolution', [canvas.width, canvas.height])
        warpPass.setUniform('u_mouseEnabled', isMobile() ? 0.0 : 1.0)
    }

    const initializePipeline = (gl: WebGLRenderingContext) => {
        // Create shader programs
        const spGradient = createShaderProgram(gl, vsGradient, fsGradient)
        const spNoise = createShaderProgram(gl, vsNoise, fsNoise)
        const spWarp = createShaderProgram(gl, vsWarp, fsWarp)

        // Create gradient pass
        const gradientPass = new GLPostPass(gl, spGradient)
        const noisePass = new GLPostPass(gl, spNoise)
        const warpPass = new GLPostPass(gl, spWarp)

        // Create pipeline (last pass renders to screen)
        const pipeline = new GLPostPipeline(gl, 'u_firstPassTexture')
        pipeline.addPass(gradientPass, canvas.width, canvas.height)
        pipeline.addPass(noisePass, canvas.width, canvas.height)
        pipeline.addPass(warpPass, canvas.width, canvas.height)

        return { pipeline, gradientPass, noisePass, warpPass }
    }

    const updateUniforms = (
        elapsedTime: number,
        gradientPass: GLPostPass,
        noisePass: GLPostPass,
        warpPass: GLPostPass
    ) => {
        updateGradientUniforms(gradientPass)
        updateWarpUniforms(warpPass, elapsedTime)
        updateNoiseUniforms(noisePass)
    }

    const setCanvasSize = () => {
        const rect = canvas.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        canvas.width = Math.floor((rect.width * dpr) / PIXEL_SCALE)
        canvas.height = Math.floor((rect.height * dpr) / PIXEL_SCALE)
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

        // Initialize color palette based on current theme
        colorPaletteNorm = getCurrentColorPalette()

        // Initialize points
        points = initializePoints()

        // Initialize pipeline and passes
        const { pipeline, gradientPass, noisePass, warpPass } =
            initializePipeline(gl)

        // Set initial canvas and pipeline size
        setCanvasSize()
        pipeline.resize(canvas.width, canvas.height)

        let startTime = performance.now()

        const render = () => {
            // Canvas may not exist when updating shaders. Avoid errors.
            if (!canvas) {
                return
            }

            updatePoints()
            updatedMouseSmoothed()
            const elapsedTime = (performance.now() - startTime) / 1000 // in seconds

            updateUniforms(elapsedTime, gradientPass, noisePass, warpPass)

            pipeline.render()
            requestAnimationFrame(render)
        }

        const handleResize = () => {
            setCanvasSize()
            pipeline.resize(canvas.width, canvas.height)
        }

        const mouseHandler = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
        }

        const throttledMouseHandler = throttle((event: MouseEvent) => {
            mouseHandler(event)
        }, 100)

        // Listen for theme changes
        const themeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        )
        const handleThemeChange = () => {
            console.log('Theme changed')
            // Update color palette
            colorPaletteNorm = getCurrentColorPalette()

            // Update point colors
            points = points.map((point, index) => ({
                ...point,
                color: colorPaletteNorm[index % colorPaletteNorm.length],
            }))

            // Update shader uniforms
            updateGradientUniforms(gradientPass)
        }

        // Add listeners
        themeMediaQuery.addEventListener('change', handleThemeChange)
        window.addEventListener('mousemove', throttledMouseHandler)
        let resizeTimeout: ReturnType<typeof setTimeout>
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(handleResize, 200)
        })

        // Core loop
        render()

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', throttledMouseHandler)
            themeMediaQuery.removeEventListener('change', handleThemeChange)
        }
    })
</script>

<canvas bind:this={canvas} class={$$props.class}></canvas>

<style>
    canvas {
        display: block;
        pointer-events: none;
    }
</style>
