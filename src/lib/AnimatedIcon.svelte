<script lang="ts">
    let svg_path:string;
    let link:string;
    let title:string;
</script>

<a href={link} target="_blank">
    <svg class="icon" 
        role="graphics-symbol"
        xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path d={svg_path} pathLength="1"/>
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
        animation-fill-mode: initial;
    }

    .icon:hover {
        animation-play-state: running;
    }

    .icon path {
        stroke-width: 0px; /* no stroke width to avoid writing over fill in regular state */
        fill: var(--foreground);
        stroke: var(--background-primary);
        transition: all 0.5s ease;
    }

    .icon:hover path {
        stroke-width: 1px;
        fill: var(--background-primary);
        stroke: var(--foreground);
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