<script>
    import { onMount } from "svelte";

    let container;
    let currentIndex = 0;
    let totalSlides;

    const next = () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    };

    const prev = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1;
        }
        updateCarousel();
    };

    const updateCarousel = () => {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    onMount(() => {
        totalSlides = container.children.length;
    });
</script>

<div class="carousel">
    <button on:click={prev}>Previous</button>
    <div class="carousel-container" bind:this={container}>
        <slot></slot>
    </div>
    <button on:click={next}>Next</button>
</div>

<style>
    .carousel {
        display: flex;
        align-items: center;
    }

    .carousel-container {
        display: flex;
        overflow: hidden;
        width: 100%;
        padding: 10px; /* For when cards translate in 3D */
    }

    .carousel-container > * {
        flex: 0 0 100%;
    }
</style>
