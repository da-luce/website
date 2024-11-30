<script lang="ts">
    import Hover from './Hover.svelte'
    import ArrowLink from './ArrowLink.svelte'
    import Loading from './Loading.svelte'

    export let videoSrc: string
    export let imageSrc: string // Add this to accept image source
    export let title: string
    export let desc: string
    export let tags: string[]
    export let href: string

    let videoElements = []
    let loadingElements = []

    const handleMouseEnter = (event) => {
        const video = event.currentTarget
        video.play()
    }

    const handleMouseLeave = (event) => {
        const video = event.currentTarget
        video.pause()
    }

    const handleLoadedData = (event) => {
        const index = videoElements.indexOf(event.currentTarget)
        if (index > -1) {
            loadingElements[index].style.display = 'none'
        }
    }

    const handleWaiting = (event) => {
        const index = videoElements.indexOf(event.currentTarget)
        if (index > -1) {
            loadingElements[index].style.display = 'flex'
        }
    }

    const handlePlaying = (event) => {
        const index = videoElements.indexOf(event.currentTarget)
        if (index > -1) {
            loadingElements[index].style.display = 'none'
        }
    }

    const handleVideoClick = (event) => {
        const video = event.currentTarget
        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }
</script>

<div class="project" role="presentation">
    <div class="video-container wide">
        <Hover>
            <div class="video-wrapper">
                {#if videoSrc}
                    <div class="loading-wrapper" bind:this={loadingElements[0]}>
                        <Loading size={50} />
                    </div>
                    <video
                        bind:this={videoElements[0]}
                        src={videoSrc}
                        loop
                        muted
                        preload="auto"
                        class="media-element"
                        on:mouseenter={handleMouseEnter}
                        on:mouseleave={handleMouseLeave}
                        on:click={handleVideoClick}
                        on:loadeddata={handleLoadedData}
                        on:waiting={handleWaiting}
                        on:playing={handlePlaying}
                        playsinline
                    ></video>
                {:else if imageSrc}
                    <img
                        bind:this={loadingElements[0]}
                        src={imageSrc}
                        alt={title}
                        class="media-element"
                    />
                {:else}
                    <div class="media-element placeholder"></div>
                {/if}
            </div>
        </Hover>
    </div>

    <div class="content">
        <ArrowLink {href}><h3 class="title">• {title}</h3></ArrowLink>
        <div class="video-container thin">
            <Hover>
                <div class="video-wrapper">
                    {#if videoSrc}
                        <div
                            class="loading-wrapper"
                            bind:this={loadingElements[1]}
                        >
                            <Loading size={50} />
                        </div>
                        <video
                            bind:this={videoElements[1]}
                            src={videoSrc}
                            loop
                            muted
                            preload="auto"
                            class="media-element"
                            on:mouseenter={handleMouseEnter}
                            on:mouseleave={handleMouseLeave}
                            on:click={handleVideoClick}
                            on:loadeddata={handleLoadedData}
                            on:waiting={handleWaiting}
                            on:playing={handlePlaying}
                            playsinline
                        ></video>
                    {:else if imageSrc}
                        <img
                            bind:this={loadingElements[1]}
                            src={imageSrc}
                            alt={title}
                            class="media-element"
                        />
                    {:else}
                        <div class="media-element placeholder"></div>
                    {/if}
                </div>
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
        display: flex; /* Hide by default */
    }

    .media-element {
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease;
    }

    .media-element:hover {
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
