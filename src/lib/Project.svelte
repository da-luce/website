<script lang="ts">
    import Hover from "./Hover.svelte";
    export let videoSrc: string;
    export let title: string;
    export let desc: string;
    export let tags: string[];

    let videoElement: HTMLVideoElement;

    async function startScreenCapture() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always" },
                audio: false,
            });
            videoElement.srcObject = stream;
            videoElement.play();
        } catch (err) {
            console.error("Error: " + err);
        }
    }

    const handleMouseEnter = () => {
        if (videoSrc === "recursive") {
            startScreenCapture();
        } else if (videoSrc) {
            videoElement.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoSrc === "recursive") {
            const tracks = videoElement.srcObject?.getTracks();
            tracks?.forEach((track) => track.stop());
            videoElement.srcObject = null;
        } else if (videoSrc) {
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
            {#if videoSrc === "recursive" || videoSrc}
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
        <div class="title">• {title}</div>
        <p class="description">{desc}</p>
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
        padding: 20px;
        max-width: 50vw;
    }

    .video-container {
        flex: 1;
        max-width: 30vw; /* Adjust the size as needed */
    }

    .media-element {
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        filter: grayscale(1);
    }

    .media-element:hover {
        filter: grayscale(0);
    }

    .placeholder {
        border: 2px solid var(--foreground);
        background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            var(--foreground) 10px,
            var(--foreground) 12px
        );
        height: 0;
        padding-bottom: 56.25%; /* Aspect ratio 16:9 */
    }

    .content {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }

    .title {
        font-family: var(--fancy-font);
        font-size: 1.5em;
        color: var(--foreground);
    }

    .description {
        font-family: var(--reddit-font);
        font-size: 1em;
        color: var(--foreground);
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
        font-family: var(--mono-font);
        font-size: 0.8em;
        backdrop-filter: blur(1000px);
    }

    .project:hover {
        cursor: pointer;
    }
</style>
