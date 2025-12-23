<script lang="ts">
    import type { TimelineItem } from '$types/shared'
    import SVGIcon from './SVGIcon.svelte'

    export let items: TimelineItem[] = []

    function isSvg(path: string): boolean {
        return path.toLowerCase().endsWith('.svg')
    }
</script>

<div class="timeline-container">
    <div class="timeline-line-bg"></div>
    {#each items as item, index}
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="content-left">
                    {#if isSvg(item.image)}
                        <div
                            class="timeline-icon"
                            style="width: {item.imageSize ||
                                '3rem'}; height: {item.imageSize ||
                                '3rem'}; transform: translateY(calc((var(--size-4) * 1.2 / 2) - ({item.imageSize ||
                                '3rem'} / 2))); {item.imageStyle || ''}"
                        >
                            <SVGIcon
                                src={item.image}
                                size={item.imageSize || '3rem'}
                                color="var(--foreground)"
                            />
                        </div>
                    {:else}
                        <img
                            src={item.image}
                            alt={item.title}
                            class="timeline-image"
                            style="width: {item.imageSize ||
                                '3rem'}; height: {item.imageSize ||
                                '3rem'}; transform: translateY(calc((var(--size-4) * 1.2 / 2) - ({item.imageSize ||
                                '3rem'} / 2))); {item.imageStyle || ''}"
                        />
                    {/if}
                </div>
                <div class="timeline-marker">
                    {#if item.showDot !== false}
                        <div class="timeline-dot"></div>
                    {/if}
                </div>
                <div class="content-right">
                    <h3 class="timeline-title">{item.title}</h3>
                    <p class="timeline-date">{item.date}</p>
                    <p class="timeline-description">{item.description}</p>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .timeline-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 2rem 0;
        position: relative;
    }

    .timeline-line-bg {
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(
            to bottom,
            var(--background-primary) 0%,
            var(--foreground) 10%,
            var(--foreground) 90%,
            var(--background-primary) 100%
        );
        transform: translateX(-50%);
    }

    .timeline-item {
        position: relative;
        width: 100%;
    }

    .timeline-content {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 2rem;
        align-items: start;
        margin-bottom: 3rem;
    }

    .content-left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .timeline-image {
        width: 3rem;
        height: 3rem;
        object-fit: cover;
        border-radius: 0.5rem;
    }

    .timeline-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .timeline-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .timeline-dot {
        width: 0.6rem;
        height: 0.6rem;
        background-color: var(--foreground);
        border-radius: 50%;
        z-index: 2;
        flex-shrink: 0;
        transform: translateY(calc((var(--size-4) * 1.2 / 2) - (0.6rem / 2)));
    }

    .content-right {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .timeline-title {
        font-family: var(--mono-font);
        font-size: var(--size-4);
        font-weight: bold;
        color: var(--foreground);
        margin: 0;
        line-height: 1.2;
    }

    .timeline-date {
        font-family: var(--mono-font);
        font-size: var(--size-5);
        color: var(--foreground-secondary);
        margin: 0;
    }

    .timeline-description {
        font-family: var(--mono-font);
        font-size: var(--size-5);
        color: var(--foreground-secondary);
        line-height: 1.6;
        margin: 0;
        font-weight: 300;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .timeline-line-bg {
            left: 0.8rem;
        }

        .timeline-content {
            grid-template-columns: auto 1fr;
            gap: 1rem;
        }

        .content-left {
            display: none;
        }

        .timeline-image {
            width: 2.5rem;
            height: 2.5rem;
        }

        .timeline-dot {
            width: 0.5rem;
            height: 0.5rem;
        }
    }
</style>
