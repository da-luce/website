<script lang="ts">
    import type { Post } from '$types/shared'
    export let post: Post | null = null
</script>

<div class="card-container" class:masked={!post}>
    <div class="post-card" class:hover={post}>
        {#if !post}
            <!-- If no post is provided, show "More Coming Soon" -->
            <h4 class="coming-soon">Bottom of the Stack</h4>
            <p class="desc">Memory allocated...more posts on the way!</p>
            <p class="date">// ???? // ????</p>
        {:else}
            <a href={`/posts/${post.slug}`}>
                <h4>{post.title}</h4>
                <p class="desc">{post.description}</p>
                <p class="date">// {post.date} // {post.slug}</p>
            </a>
        {/if}
    </div>
</div>

<style>
    p {
        font-family: var(--mono-font);
        font-size: var(--size-5);
    }
    .date {
        font-family: var(--mono-font);
    }

    .desc {
        font-family: var(--mono-font);
    }
    h4 {
        font-size: 1.5rem;
        font-family: var(--mono-font);
        font-weight: bolder;
    }

    .card-container {
        width: 100%;
    }
    /* https://stackoverflow.com/questions/57218443/how-to-animate-a-radial-gradient-using-css 
    is super helpful in understanding background animation */
    .post-card {
        padding: 3em;
        font-size: var(--size-3);
        font-family: var(--title-font);
        --radius: 0.5em;
        border-radius: var(--radius);
        padding: var(--radius);
        border: 2px solid var(--foreground);
        transition: all 0.5s ease;
        min-height: 5rem;

        background-size: 400% 400%;
        background-position: 50% 0%;

        color: var(--foreground);
    }

    .masked {
        mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 70%
        );
        -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 70%
        );
    }

    .hover:hover {
        transform: translateX(5px);
        background-size: 200% 200%;
        background-position: 50% 0%;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
