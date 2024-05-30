<script lang="ts">
    import Landing from "./lib/Landing.svelte";
    import Socials from "./lib/Socials.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Gradient from "./lib/Gradient.svelte";
    import Timeline from "./lib/Timeline.svelte";
    import Scrolling from "./lib/Scrolling.svelte";
    import Logo from "./lib/Logo.svelte";
    import Project from "./lib/Project.svelte";
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

<section id="projects">
    <Project
        videoSrc="src/assets/starsaver.mov"
        title="Starsaver"
        desc="I've always been interested in the command line-the power of ASCII characters and a limited selection of colors to portray more than just text. Starsaver enables users to display the positions of stars in realtime. Also got to explore c."
        tags={["c", "Meson", "ncurses"]}
    />
    <Project
        videoSrc="recursive"
        title="Personal Website"
        desc="..."
        tags={["JavaScript", "TypeScript", "HTML & CSS", "Svelte 4.0"]}
    />
</section>
