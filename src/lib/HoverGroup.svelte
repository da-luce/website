<div class="hover-group">
    <slot />
</div>

<style>
    .hover-group:hover :global(.hover-move) {
        transform: translateX(var(--hover-move, 4px))
            translateY(var(--hover-move, -4px));
    }

    .hover-group :global(.hover-move) {
        transition: transform var(--transition-duration) ease;
    }
</style>
