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
        container.style.transform = `translateX(${currentIndex * 50}%)`;
    };

    onMount(() => {
        totalSlides = container.children.length;
    });
</script>

<div class="carousel">
    <button on:click={prev} class="arrow left">Previous</button>
    <div class="carousel-container" bind:this={container}>
        <slot></slot>
    </div>
    <button on:click={next} class="arrow right">Next</button>
</div>

<style>
    .carousel {
        display: flex;
        align-items: center;
    }

    .carousel-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        transition: transform 0.5s ease-in-out;
        gap: 20px;
        overflow: hidden;
        width: 80%; /* Adjust to fit your layout */
    }

    .arrow {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        margin: 0 20px;
        color: white;
    }
</style>
