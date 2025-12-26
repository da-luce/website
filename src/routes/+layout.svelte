<script lang="ts">
    import '../app.css'
    import { BLOB } from '$lib/config'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" type="image/png" href="{BLOB}/images/favicon.png" />
</svelte:head>

<div class="app">
    <main>
        {@render children()}
    </main>
</div>
