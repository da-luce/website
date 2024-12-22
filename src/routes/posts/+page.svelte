<script lang="ts">
    import type { PageData } from './$types'
    import PostCard from '$lib/PostCard.svelte'

    let { data }: { data: PageData } = $props()
    let posts = data.posts

    function formatHexAddress(index: number): string {
        const hex = index.toString(16).toUpperCase()
        return `0x${hex.padStart(4, '0')}`
    }
</script>

<div id="post-container">
    <h1>The Post Stack.</h1>
    <h4>Push, Pop, and Learn!</h4>
    {#if posts && posts.length > 0}
        <div class="posts-grid">
            {#each posts as post, index}
                <div class="post-card">
                    <div class="hex-address">
                        {formatHexAddress(index)}
                    </div>
                    <PostCard {post} />
                </div>
            {/each}
            <div class="post-card">
                <div class="hex-address">
                    {'0xFFFF'}
                </div>
                <PostCard />
            </div>
        </div>
    {:else}
        <p>No posts found</p>
    {/if}
</div>

<style>
    h1 {
        margin-bottom: 0.5rem;
    }

    h4 {
        font-family: var(--mono-font);
        margin-bottom: 4rem;
    }
    #post-container {
        max-width: 40em;
        margin: var(--size-1) auto;
        box-sizing: border-box;
        padding: 0em 1em;
    }
    .posts-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .post-card {
        display: flex;
        align-items: center; /* Centering vertically */
        gap: 16px;
    }
    .hex-address {
        color: var(--foreground);
        font-family: var(--mono-font);
        font-weight: bold;
        font-size: var(--size-4);
        text-align: center;
    }
</style>
