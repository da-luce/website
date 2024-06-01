<script lang="ts">
    /* FIXME: janky on Chrome */
    import { onMount } from "svelte";
    import { throttle } from "../throttle"; // Ensure this path is correct

    export let defaultGap = 1; // Default gap in rem

    let iconGap = defaultGap; // Initial spacing in rem
    let lastTime = 0;
    let lastY = 0;
    let returnInterval;

    let b = 0.02; // Damping coefficient
    let k = 0.1; // Return coefficient

    function handleScroll(event) {
        clearInterval(returnInterval); // Clear any existing interval

        const currentTime = performance.now();
        const timeDiff = currentTime - lastTime;
        const scrollDiff = window.scrollY - lastY;

        if (timeDiff > 0) {
            const scrollVelocity = scrollDiff / timeDiff;

            iconGap = iconGap + b * scrollVelocity - k * (iconGap - defaultGap);

            lastTime = currentTime;
            lastY = window.scrollY;
        }

        startReturnInterval(); // Start the return interval immediately after handling scroll
    }

    function startReturnInterval() {
        returnInterval = setInterval(() => {
            iconGap -= k * (iconGap - defaultGap);

            // If close enough, set normal
            if (Math.abs(defaultGap - iconGap) < 0.01) {
                iconGap = defaultGap;
                clearInterval(returnInterval);
            }
        }, 16);
    }

    const throttledScrollHandler = throttle(handleScroll, 10); // 10 ms

    onMount(() => {
        window.addEventListener("scroll", throttledScrollHandler);
        return () => {
            window.removeEventListener("scroll", throttledScrollHandler);
            clearInterval(returnInterval); // Clear the interval on unmount
        };
    });
</script>

<div id="content" style="--icon-spacing: {iconGap}rem;">
    <slot></slot>
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Align items to the end of the flex container (right side) */
        gap: var(--icon-spacing); /* Use CSS variable for spacing */
        pointer-events: auto; /* Enable pointer events for the children */
        transition: gap 0.01s linear; /* Smooth transition for spacing change */
    }
</style>
