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
        viewBox="0 0 {size} {size}"
        xmlns="http://www.w3.org/2000/svg"
    >
        <!-- Define a circular path for the text -->
        <defs>
            <path
                id="circlePath"
                d="M {center}, {center} m -{radius}, 0 a {radius},{radius} 0 1,1 {radius *
                    2},0 a {radius},{radius} 0 1,1 -{radius * 2},0"
            />
        </defs>
        <!-- Text following the circular path -->
        <text font-size="12">
            <textPath href="#circlePath" startOffset="0">
                * ABOUT ME * ABOUT ME
            </textPath>
        </text>
        <!-- Arrow elements -->
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
    </svg>
</div>

<style>
    svg {
        cursor: pointer;
    }

    text {
        fill: var(--foreground);
        font-family: var(--mono-font);
    }

    line {
        fill: none;
        stroke: var(--foreground);
    }

    .middle {
        animation: grow 3s infinite;
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
            stroke-dashoffset: -40;
        }
    }
</style>
