<script>
    export let text = "Experience";
    export let icon = "✧";
    export let spacing = "100px"; // Customize spacing between icon and text
    import { onMount } from "svelte";

    let path;
    let textPath;

    const handleScroll = () => {
        const pathLength = path.getTotalLength();

        const scrollPercentage =
            window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const offset = pathLength * scrollPercentage * 0.2;

        textPath.setAttribute("startOffset", `${-offset}px`);
    };

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<div style="width: 100%;">
    <svg width="100%" viewBox="0 0 100 10">
        <path
            id="scroll-path"
            bind:this={path}
            fill="transparent"
            d="M0,5 L100,5"
        ></path>
        <text>
            <textPath
                xlink:href="#scroll-path"
                startOffset="0"
                bind:this={textPath}
            >
                {#each { length: 10 } as _, i}
                    <tspan dx={spacing}>{text}</tspan>
                    <tspan dx={spacing}>{icon}</tspan>
                {/each}
            </textPath>
        </text>
    </svg>
</div>

<style>
    textPath {
        font-family: var(--fancy-font);
        font-size: 0.05rem;
        fill: var(--foreground);
        font-style: italic;
    }
</style>
