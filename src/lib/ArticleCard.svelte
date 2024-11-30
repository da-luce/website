<script lang="ts">
    import type { Article } from '$types/shared'
    export let article: Article
</script>

<div class="card-container">
    <a href={`/articles/${article.slug}`}>
        <div class="article-card">
            <h4>{article.title}</h4>
            <p>{article.description}</p>
            <p class="date">// {article.date} // {article.slug}</p>
        </div>
    </a>
</div>

<style>
    .date {
        color: rgba(255, 255, 255, 0.5);
    }

    .card-container {
        width: 100%;
    }

    .article-card {
        padding: 3em;
        font-size: var(--size-3);
        font-family: var(--serif-font);
        --radius: 0.5em;
        border-radius: var(--radius);
        padding: var(--radius);
        border: 1px solid var(--foreground); /* Light border */
        transition: all 0.5s ease;
        background-image: radial-gradient(
            ellipse at bottom,
            rgba(255, 255, 255, 0.05),
            rgba(3, 12, 29, 1)
        ); /* Initial gradient */

        color: var(--foreground);
    }

    .article-card:hover {
        border-left: var(--radius) solid var(--foreground);
        transform: translateX(var(--radius)); /*Slight lift on hover */
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
