<script lang="ts">
    import Hover from "./Hover.svelte";
    import ArrowLink from "./ArrowLink.svelte";
    import Loading from "./Loading.svelte";

    export let videoSrc: string;
    export let title: string;
    export let desc: string;
    export let tags: string[];
    export let href: string;

    let videoLoading = true;

    const handleMouseEnter = (event: Event) => {
        const video = event.currentTarget as HTMLVideoElement;
        video.play();
    };

    const handleMouseLeave = (event: Event) => {
        const video = event.currentTarget as HTMLVideoElement;
        video.pause();
    };

    const handleLoadedData = () => {
        videoLoading = false;
    };
</script>

<div class="project" role="presentation">
    <div class="video-container wide">
        <Hover>
            {#if videoSrc}
                <div class="video-wrapper">
                    {#if videoLoading}
                        <div class="loading-wrapper">
                            <Loading size={50} />
                        </div>
                    {/if}
                    <video
                        src={videoSrc}
                        loop
                        muted
                        class="media-element"
                        on:mouseenter={handleMouseEnter}
                        on:mouseleave={handleMouseLeave}
                        on:loadeddata={handleLoadedData}
                    ></video>
                </div>
            {:else}
                <div class="media-element placeholder"></div>
            {/if}
        </Hover>
    </div>
    <div class="content">
        <ArrowLink {href}><h3 class="title">• {title}</h3></ArrowLink>
        <div class="video-container thin">
            <Hover>
                {#if videoSrc}
                    <div class="video-wrapper">
                        {#if videoLoading}
                            <div class="loading-wrapper">
                                <Loading size={50} />
                            </div>
                        {/if}
                        <video
                            src={videoSrc}
                            loop
                            muted
                            class="media-element"
                            on:mouseenter={handleMouseEnter}
                            on:mouseleave={handleMouseLeave}
                            on:loadeddata={handleLoadedData}
                        ></video>
                    </div>
                {:else}
                    <div class="media-element placeholder"></div>
                {/if}
            </Hover>
        </div>
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
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
        margin: 1em 0;
    }

    .project:hover {
        opacity: 1;
    }

    .wide {
        width: 50%;
    }

    .thin {
        width: 100%;
        display: none;
    }

    .video-wrapper {
        position: relative;
    }

    .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
        padding-bottom: 56.25%; /* Aspect ratio 16:9 */
        backdrop-filter: blur(5px);
        filter: none; /* Override grayscale filter */
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
        background-color: #b6e3fc3b; /* TODO: calculate this using preprocessor */
        color: var(--highlight);
        padding: 5px 10px;
        border-radius: 15px;
        font-family: var(--mono-font);
        font-weight: bold;
        font-size: 0.9em;
        backdrop-filter: blur(100px);
    }

    @media (max-width: 600px) {
        .wide {
            display: none;
        }

        .thin {
            display: block;
        }
    }
</style>
