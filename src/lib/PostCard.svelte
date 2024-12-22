<script lang="ts">
    import type { Post } from '$types/shared'
    export let post: Post | null = null
</script>

<div class="card-container" class:masked={!post}>
    <div class="post-card" class:hover={post}>
        {#if !post}
            <!-- If isComingSoon is true, show "More Coming Soon" -->
            <h4 class="coming-soon">More Coming Soon</h4>
        {:else}
            <a href={`/posts/${post.slug}`}>
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <p class="date">// {post.date} // {post.slug}</p>
            </a>
        {/if}
    </div>
</div>

<style>
    p {
        font-family: var(--sans-font);
    }
    .date {
        color: rgba(255, 255, 255, 0.5);
        font-family: var(--mono-font);
    }

    h4 {
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
        font-family: var(--serif-font);
        --radius: 0.5em;
        border-radius: var(--radius);
        padding: var(--radius);
        border: 2px solid var(--foreground);
        transition: all 0.5s ease;
        min-height: 5rem;

        /* Background animation */
        background-image: radial-gradient(
            ellipse at 50% 50%,
            rgba(255, 255, 255, 0.1),
            rgba(3, 12, 29, 1)
        );
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
        border-bottom: 5px solid var(--foreground);
        transform: translateY(-5px);
        background-size: 200% 200%;
        background-position: 50% 0%;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
