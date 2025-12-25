<script lang="ts">
    import { onMount } from 'svelte'
    import { Star } from 'lucide-svelte'
    import ArrowLink from './ArrowLink.svelte'
    import ArrowIcon from './icons/ArrowIcon.svelte'
    import HoverGroup from './HoverGroup.svelte'
    import Hover from './Hover.svelte'

    export let imageSrc: string
    export let title: string
    export let description: string
    export let href: string

    let stars: number | null = null
    let loading = false
    const MIN_STARS_THRESHOLD = 10 // Don't show stars below this threshold

    // Extract GitHub owner/repo from URL
    function extractGitHubRepo(
        url: string
    ): { owner: string; repo: string } | null {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/)
        if (match) {
            return {
                owner: match[1],
                repo: match[2],
            }
        }
        return null
    }

    // Fetch GitHub stars
    async function fetchGitHubStars() {
        const repoInfo = extractGitHubRepo(href)
        if (!repoInfo) return

        loading = true
        try {
            const response = await fetch(
                `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`
            )
            if (response.ok) {
                const data = await response.json()
                stars = data.stargazers_count
            }
        } catch (error) {
            console.error('Failed to fetch GitHub stars:', error)
        } finally {
            loading = false
        }
    }

    onMount(() => {
        fetchGitHubStars()
    })
</script>

<HoverGroup>
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
            <div class="title-row">
                <h3>
                    {title}
                    <div class="hover-move arrow-container">
                        <ArrowIcon />
                    </div>
                </h3>
                {#if stars !== null && stars >= MIN_STARS_THRESHOLD}
                    <div class="stars">
                        <Star class="star-icon" size={16} />
                        <span class="star-count">{stars.toLocaleString()}</span>
                    </div>
                {/if}
            </div>
            <p>{description}</p>
        </div>
    </a>
</HoverGroup>

<style>
    .arrow-container {
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card {
        display: flex;
        flex-direction: column;
        background: var(--background-secondary, rgba(255, 255, 255, 0.05));
        border-radius: var(--border-radius);
        overflow: hidden;
        transition:
            transform var(--transition-speed) ease,
            box-shadow var(--transition-speed) ease;
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

    .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    h3 {
        font-family: var(--title-font);
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: var(--foreground);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
        min-width: 0;
    }

    .stars {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        color: var(--foreground-secondary);
        flex-shrink: 0;
    }

    .star-icon {
        width: 1rem;
        height: 1rem;
    }

    .star-count {
        font-family: var(--mono-font);
        font-size: 0.85rem;
        font-weight: 400;
        white-space: nowrap;
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
