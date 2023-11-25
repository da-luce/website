<script lang="ts">

    import Link from './Link.svelte'

    type Particle = {
        x:number;
        y:number;
        vx:number;
        vy:number;
        radius:number;
        color:Color;
    }

    type Color = {
        r: number;
        g: number;
        b: number;
    }

    /* Colors show different in chromium */
    const colors:Color[] = [
        { r: 96, g: 37, b: 165 },
        { r: 30, g: 27, b: 133 },
        { r: 66, g: 135, b: 255 },
        { r: 244, g: 112, b: 217 }
    ];

    const drawParticle = (context:CanvasRenderingContext2D, particle: Particle) => {
        context!.beginPath();
        const gradient = context!.createRadialGradient(particle.x, particle.y, particle.radius * 0.01, particle.x, particle.y, particle.radius);
        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 1)`);
        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
        context!.fillStyle = gradient;
        context!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        context!.fill();
    }

    const updateParticleVelocity = (particle: Particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) {
            particle.vx *= -1;
            particle.x += 10;
        } else if (particle.x  > width) {
            particle.vx *= -1;
            particle.x -= 10;
        }

        if (particle.y < 0) {
            particle.vy *= -1;
            particle.y += 10;
        } else if (particle.y > height) {
            particle.vy *= -1;
            particle.y -= 10;
        }
    }

    const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to main canvas where we draw gradients
    const grainRef = useRef<HTMLCanvasElement>(null); // Reference to "in memory" canvas where we draw noise texture
    const textRef = useRef<HTMLCanvasElement>(null); // Reference to "in memory" canvas where we draw text texture

    const width = 600;
    const height = 250;

    // Particles
    const minRadius = 100;
    const maxRadius = 900;
    const numParticles = 7;
    const minSpeed = 0.5;
    const maxSpeed = 1.5;

    const requestRef = useRef<number>();    // What is this?

    const particles = useRef<Array<Particle>>([]);

    const initializeParticles = () => {

        particles.current = [];

        for(let i = 0; i < numParticles; i++) {

            particles.current[i] = {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: minSpeed + Math.random() * (maxSpeed - minSpeed),
                vy: minSpeed + Math.random() * (maxSpeed - minSpeed),
                radius: minRadius + Math.random() * (maxRadius - minRadius),
                color: colors[i % colors.length],
            }
        }
        
    };

    const dpi = window.devicePixelRatio;
    // Only do once on component mount
    useEffect(() => {

        // Get canvas
        const context = canvasRef.current!.getContext('2d');
        const grainContext = grainRef.current!.getContext("2d");
        const textContext = textRef.current!.getContext("2d");

        // Generate grain texture
        grainContext!.putImageData(noiseTexture(256, 30, false), 0, 0);

        // Generate text texture
        drawText(textContext!);

        // Initialize particle array
        initializeParticles();

        // Start animation
        requestRef.current = requestAnimationFrame(() => animate(context!));

        // Cancel animation on component unmount
        return () => cancelAnimationFrame(requestRef.current!);

    }, []);


    const animate = (context: CanvasRenderingContext2D) => {

        // Clear screen
        context?.clearRect(0,0,width,height);

        // For whatever reason, adding a shadow with an offset smooths the gradient--don't ask me why
        /*
        context!.shadowColor = "red";
        context!.shadowOffsetX = 4;
        context!.shadowOffsetY = 4;
        context!.shadowBlur = 10;
        */
        // Render particles

        context!.globalCompositeOperation = 'saturation';

        for (let i = 0; i < numParticles; i++) {
            let current = particles.current[i];
            updateParticleVelocity(current)
            drawParticle(context, current);
        }

        // Add grain (composition operation and texture settings must be tuned)
        // Randomly  offset what portion of the noise texture we are drawing
        
        context!.globalCompositeOperation = 'overlay';

        context.drawImage(grainRef.current!, 
            Math.random() * 3 * width,      // source x-offset
            Math.random() * 3 * height,     // source y-offset
            width, 
            height, 
            0,                              // destination x-offset
            0,                              // destination y-offset
            width, 
            height);

        // Add text "mask"

        context!.globalCompositeOperation = "destination-atop"

        context!.shadowColor = "transparent";

        context.drawImage(textRef.current!, 0, 0); 

        // Boost contrast

        /*
        const imageDataTemp = context!.getImageData(0, 0, width, height);
        const boosted = contrastImage(imageDataTemp, 40);
        context.putImageData(boosted, 0 ,0);
        */

        // Request new animation frame

        requestRef.current = requestAnimationFrame(() => animate(context));

    };

    /* Generate image data of random noise
    * ceiling: highest value from 0-255 that cab be generated per rgb color channel
    * alpha: alpha of the texture
    * grayscale: grayscale or not
    */
    const noiseTexture = (ceiling: number, alpha: number, grayscale: boolean): ImageData => {

        const data = new Uint8ClampedArray(width * 4 * height * 4 * 4);

        for (let i = 0; i < data.length; i += 4) {

            if (grayscale) {
                data[i] = data[i + 1] = data[i + 2] = ceiling * Math.random();
                data[i + 3] = alpha;
            } else {
                data[i] = ceiling * Math.random();
                data[i + 1] = ceiling * Math.random();
                data[i + 2] = ceiling * Math.random();
                data[i + 3] = alpha;
            }

        }

        return new ImageData(data, width * 4, height * 4);
    }

    const drawText = (context: CanvasRenderingContext2D) => {
        // Set shadow to add "fuzzy glow effect" to letters
        // Clear screen
        context?.clearRect(0, 0, width, height);

        context!.shadowOffsetX = 0;
        context!.shadowOffsetY = 0;
        context!.shadowBlur = 4;

        context!.shadowColor = "transparent";

        context!.fillStyle = "rgba(255,255,255,0)";
        context?.fillRect(0, 0, width, height);

        context!.shadowColor = "rgba(0,0,0,255)";

        context!.font = "bold 120px 'DM Serif Display'";
        context!.textAlign = "start";
        context!.fillStyle = "rgba(0,0,0,255)";
        context!.fillText("Hi.", 0, 100);
        context!.fillText("I'm Dalton.", 0, 220);
    }

    // input range [-100..100]
    const contrastImage = (imgData: ImageData, contrast: number): ImageData => {
        var d = imgData.data;
        contrast = (contrast / 100) + 1;  //convert to decimal & shift range: [0..2]
        var intercept = 128 * (1 - contrast);
        for (var i = 0; i < d.length; i += 4) {   //r,g,b,a
            d[i] = d[i] * contrast + intercept;
            d[i + 1] = d[i + 1] * contrast + intercept;
            d[i + 2] = d[i + 2] * contrast + intercept;
        }
        return imgData;
    }

</script>

<canvas use:grainRef style:display="none" width={width * 4 * dpi} height={height * 4 * dpi}></canvas>
<canvas use:textRef style:display="none" width={width * dpi} height={height * dpi}></canvas>
<div class="container">
    <canvas use:canvasRef width={width} height={height}>
    </canvas>
    <div class="smallerStuff">
        <p>
            I'm currently an electrical and computer engineering undergrad
            <Link text={"@Cornell"} href={"https://www.engineering.cornell.edu/"} color={"#a6192e"} />,
            where I'm a member of
            <Link text={"@Autobike"} href={"https://www.cuautobike.org/"} color={"#b3b3b3"} />.
            I'm also a current software engineering intern
            <Link text={"@RTX"} href={"https://www.rtx.com/"} color={"#ff6666"} />.
        </p>
    </div>
</div>

<style>
.wrapper {
    /*background-color: rgb(171, 171, 171)/*#161821*/
    height: 100vh;
    width: 100%;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: black;
    
}

.bigText p {

    font-family: 'Crimson Text', serif;
    font-style: bold;
    font-size: 4rem;
    color: #c6c8d1;
}

.bigText {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    overflow: hidden;
    top: 50%;
}

.blob {
    --size: 700px;
    display: block;
    position: relative;
    left: calc(var(--size) / 3 * -1);
    top: calc(var(--size) / 3 * -1);
    width: var(--size);
    height: var(--size);
    mix-blend-mode: soft-light;
    border-radius: var(--size);
    filter: blur(calc(var(--size) / 6));
    z-index: 70;
}

canvas {
    overflow: hidden;
}

.container {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    padding: 5rem;
}

.smallerStuff {
    max-width: 60rem;
}

.container p {

    font-family: "Lucida Console", monospace;
    font-weight: normal;
    font-size: 1rem;
    color: #c6c8d1;
    line-height: 2.5rem; /*Increase line height to avoid "link" borders overlapping */
}

.linked {
    border-width: 0.1rem;
    border-style: solid;
    border-radius: 0.75rem;
    padding: 0.5rem;
    transition-duration: 250ms;
    color: #c6c8d1;
}

.cornell {
}

.cornell:hover {
    background-color: #ee7d7d;
    color: black;
}
</style>
