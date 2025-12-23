<script lang="ts">
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
    <span>{text}</span>
</a>

<style>
    a {
        position: relative; /* needed for pseudo-element */
        overflow: hidden; /* clip the bubble */
        border: 3px solid var(--foreground);
        border-radius: 0.75rem;
        padding: 0.4rem 1rem;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        color: var(--foreground);
        background-color: transparent;
        transition: color 0.35s ease-in-out;
    }

    a::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -200%; /* offscreen to the left */
        width: 200%;
        height: 200%;
        background-color: var(--foreground);
        border-radius: 20rem;
        z-index: 0;
        transform: translateX(
            0
        ); /* starting position relative to left: -100% */
        transition: transform 0.35s ease-in-out;
    }

    a span {
        position: relative;
        z-index: 1;
        transition: color 0.35s ease-in-out;
    }

    /* On hover: bubble moves to cover button */
    a:hover::before {
        transform: translateX(90%); /* moves bubble from left to center */
    }

    a:hover span {
        color: var(--background-primary);
    }
</style>
