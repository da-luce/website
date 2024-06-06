<script lang="ts">
    import { onMount } from "svelte";
    import { throttle } from "../../scripts/throttle"; // Ensure this path is correct

    export let defaultGap = 1; // Default gap in rem

    let iconGap = defaultGap; // Initial spacing in rem
    let lastTime = 0;
    let lastY = 0;
    let returnAnimationFrame;

    export let dampingCoeff = 0.02; // Damping coefficient
    export let returnCoeff = 0.1; // Return coefficient
    export let enabled = true;

    function handleScroll(event) {
        cancelAnimationFrame(returnAnimationFrame); // Cancel any existing animation frame

        const currentTime = performance.now();
        const timeDiff = currentTime - lastTime;
        const scrollDiff = window.scrollY - lastY;

        if (timeDiff > 0) {
            const scrollVelocity = scrollDiff / timeDiff;

            iconGap =
                iconGap +
                dampingCoeff * scrollVelocity -
                returnCoeff * (iconGap - defaultGap);

            lastTime = currentTime;
            lastY = window.scrollY;
        }

        startReturnAnimation(); // Start the return animation immediately after handling scroll
    }

    function startReturnAnimation() {
        function animate() {
            iconGap -= returnCoeff * (iconGap - defaultGap);

            // If close enough, set normal
            if (Math.abs(defaultGap - iconGap) >= 0.01) {
                returnAnimationFrame = requestAnimationFrame(animate); // Continue the animation
            } else {
                iconGap = defaultGap;
            }
        }

        returnAnimationFrame = requestAnimationFrame(animate);
    }

    const throttledScrollHandler = throttle(handleScroll, 10); // 10 ms

    onMount(() => {
        if (!enabled) {
            return;
        }
        window.addEventListener("scroll", throttledScrollHandler);
        return () => {
            window.removeEventListener("scroll", throttledScrollHandler);
            cancelAnimationFrame(returnAnimationFrame); // Cancel the animation frame on unmount
        };
    });
</script>

<div id="content" style="--icon-spacing: {iconGap}rem;">
    <slot></slot>
</div>

<style>
    #content {
        gap: var(--icon-spacing);
        display: flex;
        flex-direction: column;
    }
</style>
