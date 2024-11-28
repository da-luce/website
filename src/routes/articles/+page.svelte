<script context="module" lang="ts">
  import { getArticleSlugs } from '$scripts/markdown';

  export async function load() {
    const slugs = getArticleSlugs();
    return {
      props: {
        slugs,
      },
    };
  }
</script>

<script>
  export let slugs;
</script>

<ul>
  {#each slugs as slug}
    <li><a href={`/articles/${slug}`}>{slug}</a></li>
  {/each}
</ul>
