<!-- Loading.svelte -->
<script lang="ts">
    export let size = 50;
</script>

<svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="var(--foreground)"
>
    <circle
        cx="25"
        cy="25"
        r="20"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="31.415, 31.415"
        transform="rotate(72 25 25)"
    >
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
        />
    </circle>
</svg>

<style>
    svg {
        display: block;
        margin: auto;
    }
</style>
