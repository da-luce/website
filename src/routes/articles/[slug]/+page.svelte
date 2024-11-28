<script lang="ts">
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<article>
    {@html data.content}
</article>

<style>

    /* FIXME: need global to get dynamically loaded markdown to style
    https://stackoverflow.com/questions/76550980/markdown-generated-html-is-not-styled-by-the-styles-specified-by-css
    */

    /* A simple CSS reset */
    :global(h1, h2, h3, h4, h5, h6, p, ul, ol) {
        padding: 0;
        font-size: 100%;
        vertical-align: baseline;
    }

    /* Main container for the article */
    :global(article) {
        max-width: 80ch; /* 80 characters wide, for better readability */
        margin: 3rem auto;
        padding: 80px;
        padding: var(--spacing-medium);
        box-sizing: border-box;
    }

    /*FIXME: gross */
    :global(article h1,
    article h2,
    article h3,
    article h4,
    article h5,
    article h6,
    article p,
    article ul,
    article ol) {
        margin-bottom: 2rem;
    }

    /* Headings */
    :global(h1) {
        font-family: var(--fancy-font);
        color: var(--highlight);
        font-size: 3rem;
        line-height: 1.1;
        -webkit-text-stroke-width: 0;
        -webkit-text-stroke-color: transparent;
        margin-bottom: var(--spacing-medium);
        outline: none;
    }

    :global(h2) {
        font-family: var(--fancy-font);
        color: var(--foreground);
        font-size: 2.5rem;
        margin-bottom: var(--spacing-small);
    }

    :global(h3) {
        font-family: var(--fancy-font);
        color: var(--foreground);
        font-size: 1.8rem;
        margin-bottom: var(--spacing-small);
    }

    :global(h4), :global(h5), :global(h6) {
        font-family: var(--fancy-font);
        color: var(--foreground);
        font-size: 1.2rem;
        margin-bottom: var(--spacing-small);
    }

    /* Paragraphs */
    :global(p) {
        font-family: var(--mono-font);
        color: var(--foreground);
        font-size: 1.125rem; /* Slightly larger for readability */
        margin-bottom: var(--spacing-medium);
    }

    /* Links */
    :global(a) {
        color: var(--highlight);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    :global(a:hover) {
        color: var(--foreground);
    }

    /* Lists */
    :global(ul), :global(ol) {
        margin-left: var(--spacing-medium);
        margin-bottom: var(--spacing-medium);
    }

    :global(li) {
        margin-bottom: var(--spacing-small);
    }

    /* Code blocks */
    :global(pre) {
        background-color: #1e2a3a;
        color: #f7f7f7;
        padding: 10px;
        border-radius: 8px;
        overflow-x: auto;
        margin-bottom: var(--spacing-medium);
    }

    :global(code) {
        font-family: var(--mono-font);
        font-size: 1rem;
        color: var(--highlight);
    }

    /* Images */
    :global(img) {
        max-width: 100%;
        height: auto;
        display: block;
        margin: var(--spacing-medium) 0;
    }

    /* Blockquote */
    :global(blockquote) {
        background-color: #2d3a48;
        color: var(--highlight);
        padding: 10px;
        border-left: 4px solid var(--highlight);
        margin: var(--spacing-medium) 0;
        font-style: italic;
    }

    /* Footer / Small print */
    :global(footer) {
        margin-top: var(--spacing-large);
        text-align: center;
        font-size: 0.875rem;
        color: var(--foreground);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        :global(h1) {
            font-size: 2.5rem;
        }

        :global(h2) {
            font-size: 2rem;
        }

        :global(h3) {
            font-size: 1.5rem;
        }

        :global(p), :global(li) {
            font-size: 1rem;
        }

        :global(article) {
            padding: var(--spacing-small);
        }
    }

    @media (max-width: 480px) {
        :global(h1) {
            font-size: 2rem;
        }

        :global(h2) {
            font-size: 1.8rem;
        }

        :global(h3) {
            font-size: 1.2rem;
        }

        :global(p), :global(li) {
            font-size: 0.95rem;
        }
    }

</style>
