<script>
    import { onMount } from "svelte";
    import { throttle } from "../../scripts/throttle";

    export let size = 100; // Default size
    let width = 3;
    const center = size / 2;
    const radius = center - 25; // Adjust the radius as needed

    let opacity = 1;
    let rotation = 0;
    let arrowGap = 2; // Initial position from bottom in vh
    let arrowPosition = arrowGap;
    let cursor = "default";
    let display = "block";

    function handleScroll() {
        const y = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const scrollableDistance = documentHeight - windowHeight;

        // Adjust opacity based on scroll position
        // Don't show at bottom right now
        const halfHeight = scrollableDistance / 2;
        opacity = (1 - y / scrollableDistance) ** 15;

        if (opacity < 0.3) {
            cursor = "default";
        } else {
            cursor = "pointer";
        }

        if (opacity < 0.01) {
            display = "none";
        } else {
            display = "block";
        }

        // Calculate rotation angle
        rotation = y > (documentHeight - windowHeight) / 2 ? 180 : 0;

        // Adjust arrow position (for different scrolling)
        const mag = 30;
        const halfWay = scrollableDistance / 2;
        const distNorm = Math.abs(y - halfWay) / halfWay;
        arrowPosition = -(mag * distNorm - mag) + arrowGap;
    }

    const throttledScrollHandler = throttle(handleScroll, 10); // 10 ms

    function handleClick() {
        if (opacity < 0.3) {
            return;
        }
        if (rotation > 90) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({
                top: Math.max(
                    document.documentElement.clientHeight || 0,
                    window.innerHeight || 0,
                ),
                behavior: "smooth",
            });
        }
    }

    function handleKeydown(event) {
        if (event.key === "Enter" || event.key === " ") {
            handleClick();
        }
    }

    onMount(() => {
        window.addEventListener("scroll", throttledScrollHandler);
        handleScroll(); // Initial call to set the correct position
        return () =>
            window.removeEventListener("scroll", throttledScrollHandler);
    });
</script>

<div
    class="arrow-container"
    role="button"
    tabindex="0"
    on:keydown={handleKeydown}
    aria-label="Scroll to top or bottom"
    on:click={handleClick}
    style="bottom: {arrowPosition}vh; opacity: {opacity}; cursor: {cursor}; display: {display};"
>
    <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style="transform: rotate({rotation}deg);"
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
    svg {
        transition:
            transform 0.5s ease-in-out,
            opacity 0.5s ease-in-out;
    }

    /* Circle */

    .hover-circle {
        transform: scale(0);
        transform-origin: 50% 50%;
        transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.4, 1);
    }

    svg:hover .hover-circle {
        transform: scale(1);
    }

    /* Arrow */
    .arrow-container {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
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
