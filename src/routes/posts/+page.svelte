<script lang="ts">
    import type { PageData } from './$types'
    import PostCard from '$lib/PostCard.svelte'
    import { goto } from '$app/navigation'

    let { data }: { data: PageData } = $props()
    let posts = data.visiblePosts

    const postCount = posts.length

    function formatHexAddress(index: number): string {
        const hex = index.toString(16).toUpperCase()
        return `0x${hex.padStart(4, '0')}`
    }

    function navigateToRandomPost(): void {
        if (posts && posts.length > 0) {
            const randomIndex = Math.floor(Math.random() * posts.length)
            const randomPost = posts[randomIndex]
            goto(`/posts/${randomPost.slug}`) // Assuming posts have a `slug` field for URLs
        }
    }
</script>

<div id="post-container">
    <h1>The Stack.</h1>
    <h4>Push, pop, and read!</h4>
    <div class="icons">
        <a href="/" title="home" class="icon-container">
            <img src="/icons/home.svg" alt="Home" class="icon" />
        </a>
        <button
            type="button"
            title="random post"
            class="icon-container"
            onclick={navigateToRandomPost}
        >
            <img src="/icons/shuffle.svg" alt="Random" class="icon" />
        </button>
    </div>
    {#if posts && posts.length > 0}
        <div class="posts-grid">
            {#each posts as post, index}
                <div class="post-card">
                    <div class="hex-address">
                        {formatHexAddress(postCount - index)}
                    </div>
                    <PostCard {post} />
                </div>
            {/each}
            <div class="post-card">
                <div class="hex-address">
                    {'0x0000'}
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
        font-family: var(--title-font);
        font-weight: 800;
    }

    h4 {
        font-family: var(--mono-font);
        color: var(--foreground-secondary);
    }

    p {
        font-family: var(--mono-font);
        font-size: var(--size-5);
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
        font-family: 'Fira Code', monospace;
        font-weight: 300;
        font-size: var(--size-4);
        text-align: center;
    }
    .icons {
        display: flex;
        gap: 1rem;
        margin-bottom: 4rem;
        margin-top: 1rem;
    }

    .icon-container {
        background-color: var(--highlight);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px; /* Adjust size as needed */
        height: 40px; /* Make it a perfect square */
        border-radius: 50%; /* Make it a circle */
        transition:
            background-color 0.3s ease,
            transform 0.3s ease;
        border: none;
    }

    .icon {
        width: 24px; /* Icon size */
        height: 24px;
        vertical-align: middle;
        color: var(--foreground); /* Adjust icon color if using inline SVGs */
    }
</style>
