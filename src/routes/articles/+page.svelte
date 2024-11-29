// src/routes/articles/+page.svelte
<script lang="ts">
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<h1>Articles</h1>

<ul>
  {#if data.articles && data.articles.length > 0}
    {#each data.articles as article}
      <li>
        <a href={`/articles/${article}`}>{article}</a>
      </li>
    {/each}
  {:else}
    <li>No articles found</li>
  {/if}
</ul>
