<script lang="ts">
    import ArrowLink from './ArrowLink.svelte'

    export let imageSrc: string
    export let title: string
    export let description: string
    export let href: string
</script>

<a
    {href}
    class="card"
    target={href.startsWith('http') ? '_blank' : '_self'}
    rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
>
    <div class="image-container">
        {#if imageSrc}
            <img src={imageSrc} alt={title} />
        {:else}
            <div class="placeholder"></div>
        {/if}
    </div>
    <div class="content">
        <h3>{title} <ArrowLink {href} /></h3>
        <p>{description}</p>
    </div>
</a>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background: var(--background-secondary, rgba(255, 255, 255, 0.05));
        border-radius: 12px;
        overflow: hidden;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        text-decoration: none;
        color: inherit;
        width: 100%;
        max-width: 350px;
    }

    .card:hover {
        transform: translateY(-4px);
    }

    .image-container {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: var(--background-tertiary, rgba(0, 0, 0, 0.1));
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .card:hover .image-container img {
        transform: scale(1.05);
    }

    .placeholder {
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            var(--foreground, #000) 10px,
            var(--foreground, #000) 11px
        );
        opacity: 0.1;
    }

    .content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    h3 {
        font-family: var(--title-font);
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: var(--foreground);
    }

    p {
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
        color: var(--foreground-secondary, rgba(0, 0, 0, 0.7));
    }

    @media (max-width: 768px) {
        .card {
            max-width: 100%;
        }
    }
</style>
