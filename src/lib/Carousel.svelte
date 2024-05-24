<!-- src/lib/Carousel.svelte -->
<script lang="ts">
    import { onMount } from "svelte";

    let currentIndex = 0;
    let childComponents = [];

    function next() {
        currentIndex = (currentIndex + 1) % childComponents.length;
    }

    function prev() {
        currentIndex =
            (currentIndex - 1 + childComponents.length) %
            childComponents.length;
    }

    onMount(() => {
        childComponents = Array.from(
            document.querySelectorAll(".carousel > *")
        );
    });
</script>

<div class="carousel-container">
    <button on:click={prev} class="arrow left">&lt;</button>
    <div class="carousel">
        {#each childComponents.slice(currentIndex, currentIndex + 4) as component}
            {component}
        {/each}
    </div>
    <button on:click={next} class="arrow right">&gt;</button>
</div>

<style>
    .carousel-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40vh;
        width: 100%;
    }
    .carousel {
        display: flex;
        overflow: hidden;
        border: 2px white;
        width: 100%;
        max-width: 1200px; /* Optional: to control the maximum width */
        scroll-behavior: smooth;
    }
    .arrow {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
    }
    .left {
        margin-right: 10px;
        color: var(--foreground);
    }
    .right {
        margin-left: 10px;
        color: var(--foreground);
    }
</style>
