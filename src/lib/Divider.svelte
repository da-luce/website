<div class="divider {$$props.class}"></div>

<style>
    .divider {
        pointer-events: none;
        /* Horizontal strip that fades vertically: transparent top → solid middle → transparent bottom */
        background: linear-gradient(
            to bottom,
            transparent,
            var(--background-primary),
            transparent
        );
    }
</style>
