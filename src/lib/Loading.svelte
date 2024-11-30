<script lang="ts">
    export let size = 50
</script>

<svg
    class="loading-spinner"
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
    ></circle>
</svg>

<style>
    .loading-spinner {
        display: block;
        margin: auto;
        animation:
            rotate 1s linear infinite,
            fadeIn 0.5s ease-in-out forwards;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
