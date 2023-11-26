<script lang="ts">
    export let path: string;
    export let link: string;
    export let title: string;
    export let strokeWidth: number = 1;
    export let viewBoxWidth: number;
    export let viewBoxHeight: number;
</script>

<a href={link} target="_blank">
    <svg
        class="icon"
        viewBox={-strokeWidth +
            " " +
            -strokeWidth +
            " " +
            (viewBoxWidth + 2 * strokeWidth) +
            " " +
            (viewBoxHeight + 2 * strokeWidth)}
        role="graphics-symbol"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>{title}</title>
        <path d={path} pathLength="1" />
    </svg>
</a>

<style>
    /* Doesn't work in chrome! */
    .icon {
        height: 2.5rem;
        stroke-linecap: round;
        animation-name: draw;
        animation-duration: 3s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-play-state: paused;
    }

    svg {
        animation-fill-mode: initial;
        fill: var(--foreground);
    }

    .icon:hover {
        animation-play-state: running;
    }

    .icon path {
        stroke-width: 0px; /* no stroke width to avoid writing over fill in regular state */
        fill: var(--foreground);
        stroke: none;
        transition: all 0.5s ease;
    }

    .icon:hover path {
        stroke-width: 1px;
        fill: none;
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
