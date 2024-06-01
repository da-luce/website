<script lang="ts">
    import Hover from "./Hover.svelte";
    import ArrowLink from "./ArrowLink.svelte";

    export let videoSrc: string;
    export let title: string;
    export let desc: string;
    export let tags: string[];
    export let href: string;

    let videoElement: HTMLVideoElement;

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
</script>

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
                <div class="placeholder media-element"></div>
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

<style>
    .project {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        width: 50vw;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .project:hover {
        opacity: 1;
    }

    .video-container {
        flex: 1; /*?*/
        max-width: 30vw; /* Adjust the size as needed */
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
        transition: filter 0.3s ease;
    }

    .media-element:hover {
        filter: grayscale(0);
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
    }

    .content {
        flex: 2;
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
        backdrop-filter: blur(1000px);
    }
</style>
