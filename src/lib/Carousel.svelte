<script>
    import { onMount } from "svelte";

    let itemList;
    let prevBtn;
    let nextBtn;
    let itemWidth;
    let padding;

    const scrollLeft = () => {
        itemList.scrollBy({
            left: -(itemWidth + padding),
            behavior: "smooth",
        });
        updateButtonState();
    };

    const scrollRight = () => {
        itemList.scrollBy({
            left: itemWidth + padding,
            behavior: "smooth",
        });
        updateButtonState();
    };

    const updateButtonState = () => {
        prevBtn.disabled = itemList.scrollLeft === 0;
        nextBtn.disabled =
            itemList.scrollLeft + itemList.clientWidth >= itemList.scrollWidth;
    };

    onMount(() => {
        // Calculate item width and padding dynamically
        const firstItem = itemList.children[0];
        if (firstItem) {
            const itemStyle = getComputedStyle(firstItem);
            itemWidth = firstItem.offsetWidth;
            padding =
                parseInt(itemStyle.marginRight) || parseInt(itemStyle.gap) || 0; // fallback to gap if marginRight is not set
        }

        prevBtn.addEventListener("click", scrollLeft);
        nextBtn.addEventListener("click", scrollRight);
        itemList.addEventListener("scroll", updateButtonState);
        updateButtonState(); // Initial check
    });
</script>

<div class="container">
    <button id="prev-btn" bind:this={prevBtn} class="prev-btn">
        <svg viewBox="0 0 512 512" width="30" title="chevron-circle-left">
            <path
                d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"
            />
        </svg>
    </button>
    <div id="item-list" class="item-list" bind:this={itemList}>
        <slot></slot>
    </div>
    <button id="next-btn" bind:this={nextBtn} class="next-btn">
        <svg viewBox="0 0 512 512" width="30" title="chevron-circle-right">
            <path
                d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c-9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"
            />
        </svg>
    </button>
</div>

<style>
    .container {
        width: 100%;
        height: 40vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .item-list {
        max-width: 950px;
        width: 80vw;
        display: flex;
        transition: all 0.25s ease-in;
        gap: 20px; /* Adjust this value to match your item padding */
        scroll-behavior: smooth;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        overflow: auto;
        scroll-snap-type: x mandatory;
    }

    /* Hide scrollbar for Chrome, Safari, and Opera */
    .item-list::-webkit-scrollbar {
        display: none;
    }

    .prev-btn,
    .next-btn {
        fill: var(--foreground);
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .prev-btn:disabled,
    .next-btn:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
</style>
