<script lang="ts">
    export let href: string;
    export let text: string;
</script>

<a {href} target="_blank">
    <span>{text}</span>
</a>

<style>
    a {
        border: 0.1rem solid var(--foreground);
        border-radius: 0.75rem;
        padding: 0.4rem;
        transition-duration: 250ms;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        color: var(--foreground);
        background-color: transparent;
    }

    a:hover {
        color: var(--background-primary); /* Static color */
        background-color: var(--foreground);
    }
</style>
