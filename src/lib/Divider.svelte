<script lang="ts">
    // Position props
    export let position: string = 'relative' // 'absolute', 'fixed', or 'relative'
    export let top: string = 'auto'
    export let right: string = 'auto'
    export let bottom: string = 'auto'
    export let left: string = 'auto'
    export let zIndex: string = '10'

    // Dimension props
    export let width: string = '100%'
    export let height: string = '80px' // Taller for smooth vertical fade

    // Margin (only applies when position is relative)
    export let margin: string = '2rem 0'
</script>

<div
    class="divider"
    style="position: {position}; top: calc({top} - {height} / 2); right: {right}; bottom: calc({bottom} - {height} / 2); left: {left}; z-index: {zIndex}; width: {width}; height: {height}; margin: {position ===
    'relative'
        ? margin
        : '0'};"
></div>

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
