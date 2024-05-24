<script lang="ts">
    import Landing from "./lib/Landing.svelte";
    import Socials from "./lib/Socials.svelte";
    import Link from "./lib/Link.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Gradient from "./lib/Gradient.svelte";
</script>

<head>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap"
        rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap"
        rel="stylesheet"
    />
</head>

<body>
    <!-- Background -->
    <Gradient />
    <!-- Social Icons -->
    <Socials />
    <!-- Landing -->
    <section id="landing">
        <div class="landing-text">
            <!-- Don't use h1, messes up text outline -->
            <div class="title" style="color: var(--foreground);">Dalton</div>
            <div class="title" style="color: rgba(0, 0, 0, 0);">Luce</div>
            <p class="subheading">
                I'm an Electrical and Computer Engineering undergraduate
                <Link
                    text="@Cornell"
                    href="https://www.engineering.cornell.edu/"
                />, actively engaged with the Cornell
                <Link text="@IEEE" href="https://www.cornellieee.com/" /> chapter,
                and contributing to innovations on the
                <Link text="@Autobike" href="https://www.cuautobike.org/" /> project
                team. Currently, I'm expanding my software engineering expertise
                as an intern
                <Link text="@RTX" href="https://www.rtx.com/" />.
            </p>
        </div>
        <div class="arrow-container"><Arrow /></div>
    </section>
    <!-- Projects -->
    <section id="projects"></section>
</body>
