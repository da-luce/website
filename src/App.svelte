<script lang="ts">
    import Landing from "./lib/Landing.svelte";
    import Socials from "./lib/Socials.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Gradient from "./lib/Gradient.svelte";
    import Timeline from "./lib/Timeline.svelte";
    import Scrolling from "./lib/Scrolling.svelte";
    import Logo from "./lib/Logo.svelte";
</script>

<head>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inconsolata:wght@200..900&display=swap"
        rel="stylesheet"
    />
</head>

<Gradient />
<Socials />
<Arrow />
<Landing />

<section id="experience">
    <div class="heading" style="color: var(--foreground);">Experience</div>
    <div
        class="heading"
        style="color: var(--foreground); opacity: 0.8; font-size: 2em;"
    >
        Where I've worked.
    </div>
    <div class="logos">
        <Logo src="src/assets/rtx.svg" alt="bruh" />
        <Logo src="src/assets/bike.png" alt="bruh" />
        <Logo src="src/assets/cornell.svg" alt="bruh" />
        <Logo src="src/assets/ieee.png" alt="bruh" />
    </div>
</section>

<section id="projects">
    <Scrolling text="Projects" icon="✦" spacing="1px" />
</section>
