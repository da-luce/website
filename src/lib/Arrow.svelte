<script>
    let width = 3;
</script>

<svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
>
    <line
        class="slant-left"
        x1="10"
        y1="30"
        x2="25"
        y2="40"
        stroke-width={width}
        stroke-linecap="round"
    />
    <line
        class="middle"
        x1="25"
        y1="10"
        x2="25"
        y2="40"
        stroke-width={width}
        stroke-linecap="round"
    />
    <line
        class="slant-right"
        x1="40"
        y1="30"
        x2="25"
        y2="40"
        stroke-width={width}
        stroke-linecap="round"
    />
</svg>

<style>
    line {
        fill: none;
        stroke: var(--foreground);
    }

    .middle {
        animation: grow 3s infinite;
        animation-timing-function: ease-in-out;
    }

    @keyframes grow {
        0%,
        100% {
            stroke-dasharray: 0, 40;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 40, 40;
            stroke-dashoffset: -30;
        }
    }
</style>
