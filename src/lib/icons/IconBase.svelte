<script lang="ts">
    export let path: string
    export let link: string
    export let title: string
    export let strokeWidth: number = 1
    export let viewBoxWidth: number = 24
    export let viewBoxHeight: number = 24
</script>

<a href={link} target="_blank" rel="noopener noreferrer">
    <svg
        class="icon"
        viewBox={-strokeWidth +
            ' ' +
            -strokeWidth +
            ' ' +
            (viewBoxWidth + 2 * strokeWidth) +
            ' ' +
            (viewBoxHeight + 2 * strokeWidth)}
        role="graphics-symbol"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
    >
        <title>{title}</title>
        <path d={path} pathLength="1" />
    </svg>
</a>

<style>
    .icon {
        height: 2.5rem;
        stroke-linecap: round;
        animation-name: none;
    }

    svg {
        animation-fill-mode: initial;
        fill: var(--foreground);
    }

    .icon:hover {
        animation: draw 3s ease forwards;
    }

    .icon path {
        transition: all 0.8s ease;
    }

    .icon path {
        stroke-width: 1px;
        fill: var(--foreground);
        stroke: var(--foreground);
    }

    :root {
        --gap: 0.25;
    }

    @keyframes draw {
        from {
            stroke-dashoffset: 1.25;
            stroke-dasharray: 1 0.25;
        }

        to {
            stroke-dashoffset: 0;
            stroke-dasharray: 1 0;
        }
    }
</style>
