<script lang="ts">
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<article>
    <div class="prose">
        {@html data.content}
    </div>
</article>

<style>

    /* FIXME: need global to get dynamically loaded markdown to style
    https://stackoverflow.com/questions/76550980/markdown-generated-html-is-not-styled-by-the-styles-specified-by-css
    */

    /* Main container for the article */
    article {
        max-width: 40em;
        margin: var(--size-1) auto;
        padding: 80px;
        padding: var(--spacing-medium);
        box-sizing: border-box;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-size: 2rem;
        }

        h3 {
            font-size: 1.5rem;
        }

        p, li {
            font-size: 1rem;
        }

        article {
            padding: var(--spacing-small);
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 2rem;
        }

        h2 {
            font-size: 1.8rem;
        }

        h3 {
            font-size: 1.2rem;
        }

        p li {
            font-size: 0.95rem;
        }
    }

</style>
