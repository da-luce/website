<script lang="ts">
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();

    import Socials from '$lib/Socials.svelte';
</script>

<article>
    <div class="prose">
        {@html data.content}
    </div>
</article>
<Socials />
<style>

    /* FIXME: need global to get dynamically loaded markdown to style
    https://stackoverflow.com/questions/76550980/markdown-generated-html-is-not-styled-by-the-styles-specified-by-css
    */

    /* Main container for the article */
    article {
        max-width: 40em;
        margin: var(--size-1) auto;
        box-sizing: border-box;
    }
</style>
