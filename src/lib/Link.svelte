<script lang="ts">
    import Pill from '$lib/Pill.svelte'

    export let href: string
    export let text: string

    // Check if this is an internal anchor link
    const isInternalLink = href.startsWith('#')

    function handleClick(e: MouseEvent) {
        if (isInternalLink) {
            e.preventDefault()
            const target = document.querySelector(href)
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }
</script>

<a {href} target={isInternalLink ? undefined : '_blank'} on:click={handleClick}>
    <Pill {text} />
</a>

<style>
    a {
        text-decoration: none;
        display: inline-block;
        mix-blend-mode: var(--blend-mode);
    }
</style>
