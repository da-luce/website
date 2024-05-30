<script lang="ts">
    import Gradient from "./Gradient.svelte";
    import Link from "./Link.svelte";
    import Arrow from "./Arrow.svelte";
    import { onMount } from "svelte";
    import ArrowLink from "./ArrowLink.svelte";

    let landingHeight = 100; // Initial height in vh

    // Cubic easing function
    function cubicEase(x: number) {
        if (x < 0) return 0;
        if (x > 1) return 1;
        return x ** 2 * (3 - 2 * x);
    }

    // Function to handle scroll event
    const handleScroll = () => {
        const maxScroll = window.innerHeight;
        const scrollY = window.scrollY;
        const scrollFraction = scrollY / maxScroll;
        const easedScroll = cubicEase(scrollFraction);
        landingHeight = Math.max(100 - easedScroll * 50, 60); // Minimum height of 10vh
    };

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<section id="landing" style="height: {landingHeight}vh;">
    <div>
        <!-- Don't use h1, messes up text outline -->
        <div class="title" style="color: var(--foreground);">Dalton</div>
        <div class="title" style="color: transparent;">Luce</div>
        <p class="subheading">
            Electrical and Computer Engineering undergraduate at <Link
                text="Cornell"
                href="https://www.engineering.cornell.edu/"
            />, actively engaged with the Cornell
            <Link text="IEEE" href="https://www.cornellieee.com/" /> chapter, and
            contributing to innovations on the
            <Link text="Autobike" href="https://www.cuautobike.org/" /> project team.
            Currently, I'm expanding my software engineering expertise as an intern
            at
            <Link text="RTX" href="https://www.rtx.com/" />. Feel free to read
            my <ArrowLink text="full resume!" href="eee" />
        </p>
    </div>
</section>

<style>
    .title {
        font-family: var(--fancy-font);
        font-size: 6em;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--foreground);
    }

    .subheading {
        pointer-events: auto;
        max-width: 40rem;
        min-width: 20rem;
        font-family: var(--reddit-font);
        font-weight: normal;
        font-size: 1rem;
        color: var(--foreground);
        line-height: 2.5rem;
    }
</style>
