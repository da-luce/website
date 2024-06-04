<script lang="ts">
    import Hover from "./Hover.svelte";
    import ArrowLink from "./ArrowLink.svelte";
    import { onMount } from "svelte";

    export let videoSrc: string;
    export let title: string;
    export let desc: string;
    export let tags: string[];
    export let href: string;

    let videoElement: HTMLVideoElement;
    let windowWidth: number = window.innerWidth;

    const handleMouseEnter = () => {
        if (videoSrc) {
            videoElement.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoSrc) {
            videoElement.pause();
        }
    };

    const handleResize = () => {
        windowWidth = window.innerWidth;
    };

    onMount(() => {
        window.addEventListener("resize", handleResize);
        handleResize(); // Ensure correct order on initial load

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

{#if windowWidth > 600}
    <div
        class="project"
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        role="presentation"
    >
        <div class="video-container">
            <Hover>
                {#if videoSrc}
                    <video
                        bind:this={videoElement}
                        src={videoSrc}
                        loop
                        muted
                        class="media-element"
                    ></video>
                {:else}
                    <div class="media-element placeholder"></div>
                {/if}
            </Hover>
        </div>
        <div class="content">
            <ArrowLink {href}><h2 class="title">• {title}</h2></ArrowLink>
            <p>{desc}</p>
            <div class="tags">
                {#each tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </div>
        </div>
    </div>
{:else}
    <div
        class="project"
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        role="presentation"
    >
        <div class="content">
            <ArrowLink {href}><h2 class="title">• {title}</h2></ArrowLink>
            <Hover>
                {#if videoSrc}
                    <video
                        bind:this={videoElement}
                        src={videoSrc}
                        loop
                        muted
                        class="media-element"
                    ></video>
                {:else}
                    <!-- TODO: hovering is glitchy on Firefox -->
                    <div class="placeholder media-element"></div>
                {/if}
            </Hover>
            <p>{desc}</p>
            <div class="tags">
                {#each tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
    .project {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
        margin-bottom: 1em;
    }

    .project:hover {
        opacity: 1;
    }

    .video-container {
        width: 50%;
    }

    .video-container:hover {
        cursor: pointer;
    }

    .media-element {
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        filter: grayscale(1);
        transition:
            filter 0.3s ease,
            box-shadow 0.3s ease;
    }

    .media-element:hover {
        filter: grayscale(0);
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
    }

    .placeholder {
        border: 1px solid var(--foreground);
        background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            var(--foreground) 10px,
            var(--foreground) 11px
        );
        height: 0;
        padding-bottom: 56.25%; /* Aspect ratio 16:9 */
        /* Reduce the intensity of the blur to improve performance */
        backdrop-filter: blur(5px);
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }

    .tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tag {
        background-color: #b6e3fc3b;
        color: var(--highlight);
        padding: 5px 10px;
        border-radius: 15px;
        font-family: var(--reddit-font);
        font-weight: bold;
        font-size: 0.9em;
        backdrop-filter: blur(100px);
    }
</style>
