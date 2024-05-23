<script>
    export let size = 100; // Default size
    let width = 3;
    const center = size / 2;
    const radius = center - 25; // Adjust the radius as needed
</script>

<div class="arrow-container">
    <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <!-- Define the mask -->
            <mask id="arrow-mask">
                <rect x="0" y="0" width={size} height={size} fill="white" />
                <!-- Use white lines for masking out the arrow part -->
                <line
                    class="slant-left"
                    x1={center - radius / 3}
                    y1={center + radius / 3}
                    x2={center}
                    y2={center + radius / 2}
                    stroke-width={width}
                    stroke-linecap="round"
                    stroke="black"
                />
                <line
                    class="middle"
                    x1={center}
                    y1={center - radius / 2}
                    x2={center}
                    y2={center + radius / 2}
                    stroke-width={width}
                    stroke-linecap="round"
                    stroke="black"
                />
                <line
                    class="slant-right"
                    x1={center + radius / 3}
                    y1={center + radius / 3}
                    x2={center}
                    y2={center + radius / 2}
                    stroke-width={width}
                    stroke-linecap="round"
                    stroke="black"
                />
            </mask>
        </defs>

        <!-- Circle element that grows on hover -->
        <circle
            class="hover-circle"
            cx={center}
            cy={center}
            r={radius}
            fill="var(--foreground)"
            mask="url(#arrow-mask)"
        ></circle>

        <!-- Arrow elements -->
        <line
            class="arrow slant-left"
            x1={center - radius / 3}
            y1={center + radius / 3}
            x2={center}
            y2={center + radius / 2}
            stroke-width={width}
            stroke-linecap="round"
            stroke="black"
        />
        <line
            class="arrow middle"
            x1={center}
            y1={center - radius / 2}
            x2={center}
            y2={center + radius / 2}
            stroke-width={width}
            stroke-linecap="round"
            stroke="black"
        />
        <line
            class="arrow slant-right"
            x1={center + radius / 3}
            y1={center + radius / 3}
            x2={center}
            y2={center + radius / 2}
            stroke-width={width}
            stroke-linecap="round"
            stroke="black"
        />
    </svg>
</div>

<style>
    .arrow-container {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    svg {
        cursor: pointer;
    }

    .hover-circle {
        transform: scale(0);
        transform-origin: 50% 50%;
        transition: transform 0.5s ease-in-out;
    }

    svg:hover .hover-circle {
        transform: scale(1);
    }

    .middle {
        animation: grow 2s infinite;
        animation-timing-function: ease-in-out;
    }

    @keyframes grow {
        0%,
        100% {
            stroke-dasharray: 0, 40;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 40, 40;
            stroke-dashoffset: -30;
        }
    }

    .arrow {
        fill: none;
        stroke: var(--foreground);
        transition: stroke 0.5s ease-in-out;
    }

    svg:hover .arrow {
        stroke: transparent;
    }
</style>
