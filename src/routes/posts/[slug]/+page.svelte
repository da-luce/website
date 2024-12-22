<script lang="ts">
    import type { PageData } from './$types'
    let { data }: { data: PageData } = $props()

    import Socials from '$lib/Socials.svelte'
</script>

<article>
    <div class="prose">
        {@html data.content}
    </div>
</article>
<Socials />
<div id="return-container">
    <p id="pre-text">&gt;&gt;</p>
    <a href="/posts" class="return-to-stack">return;</a>
</div>
<footer></footer>

<style>
    /* FIXME: need global to get dynamically loaded markdown to style
    https://stackoverflow.com/questions/76550980/markdown-generated-html-is-not-styled-by-the-styles-specified-by-css
    */

    /* Main container for the post */
    article {
        max-width: 50em;
        margin: var(--size-1) auto;
        padding: 0 var(--size-4); /*comes into play on small screens*/
        box-sizing: border-box;
    }

    footer {
        min-height: 5rem;
    }

    .return-to-stack {
        display: inline-block;
        padding: 0.5em 0.5em;
        font-family: var(--mono-font);
        font-size: var(--size-4);
        color: var(--foreground);

        font-weight: 400;
        border-radius: 0.5em;
        cursor: pointer;
        text-decoration: dotted;
        transition: all 0.3s ease;
        text-align: center; /* Center text inside the button */
        position: relative; /* Necessary for positioning the arrow */
        transform: translateX(-50px); /* Start with no movement */
    }

    /* Hover effect to make the arrow appear and move */
    .return-to-stack:hover {
        font-weight: bold;
        transform: translateX(-20px); /* Start with no movement */
    }
    #return-container {
        display: flex; /* Flexbox layout for horizontal row */
        justify-content: center; /* Horizontally center the items */
        align-items: center; /* Vertically center the items */
        position: relative;
        gap: 1rem; /* Add space between the text and the button */
    }

    #pre-text {
        font-weight: 900;
        opacity: 0; /* Start with the text hidden */
        transition: opacity 0.3s ease; /* Add a smooth transition for opacity */
    }

    #return-container:hover #pre-text {
        opacity: 1; /* Text will fade in when the container is hovered */
    }
</style>
