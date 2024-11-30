<script lang="ts">
    import type { PageData } from './$types'
    import ArticleCard from '$lib/ArticleCard.svelte'

    let { data }: { data: PageData } = $props()
    let articles = data.articles
</script>

<div id="article-container">
    <h1>Articles</h1>
    {#if articles && articles.length > 0}
        <div class="articles-grid">
            {#each articles as article}
                <ArticleCard {article} />
            {/each}
        </div>
    {:else}
        <p>No articles found</p>
    {/if}
</div>

<style>
    /* FIXME: this effect is super blurry on Safari */

    h1 {
        text-shadow:
            0 0 10vh var(--foreground),
            1vh 1vh 10vh #ff4c4c,
            -1vh -1vh 10vh #274fff;
        margin-bottom: 2em;
    }
    #article-container {
        max-width: 40em;
        margin: var(--size-1) auto;
        box-sizing: border-box;
    }
    .articles-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 0 16px;
    }
</style>
