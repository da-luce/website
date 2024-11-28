<script lang="ts">
    import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<article>
  <div>{@html data.content}</div>
</article>
