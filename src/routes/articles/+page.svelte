<script context="module" lang="ts">
  import fs from 'fs';
  import path from 'path';

  export async function load() {
    const articlesDir = path.resolve('src/routes/articles');

    // Get all files in the articles directory
    const files = fs.readdirSync(articlesDir);

    // Filter out non-markdown files and get the filenames without extensions
    const slugs = files
      .filter(file => file.endsWith('.md')) // Filter markdown files
      .map(file => file.replace('.md', '')); // Remove .md extension to get the slug

    return {
      props: {
        slugs, // Return the slugs as a prop
      },
    };
  }
</script>

<script lang="ts">
  // Receiving the slugs passed from the load function
  export let slugs: string[];
</script>

<!-- Rendering the list of articles -->
<ul>
  {#each slugs as slug}
    <li><a href={`/articles/${slug}`}>{slug}</a></li>
  {/each}
</ul>
