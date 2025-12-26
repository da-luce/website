<script lang="ts">
    export let text: string
    export let interactive: boolean = true
</script>

<span class="pill" class:interactive>
    <span class="pill-text">{text}</span>
</span>

<style>
    .pill {
        position: relative;
        border: 3px solid var(--foreground);
        border-radius: var(--border-radius);
        padding: 0.5rem 1.25rem;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
        color: var(--foreground);
        background-color: transparent;
        transition: color var(--transition-duration) ease-in-out;
        font-family: var(--mono-font);
        font-size: var(--size-5);
        font-weight: 400;
    }

    .pill.interactive:hover {
        background-color: var(--foreground);
        color: var(--background-primary);
        cursor: pointer;
    }

    .pill-text {
        position: relative;
        z-index: 1;
        transition: color 0.35s ease-in-out;
    }
</style>
