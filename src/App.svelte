<script lang="ts">
    import Landing from "./lib/Landing.svelte";
    import Socials from "./lib/Socials.svelte";
    import Link from "./lib/Link.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Gradient from "./lib/Gradient.svelte";
    import Card from "./lib/Card.svelte";
    import Carousel from "./lib/Carousel.svelte";
    import Timeline from "./lib/Timeline.svelte";
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

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
        rel="stylesheet"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap"
        rel="stylesheet"
    />
</head>

<body>
    <!-- Background -->
    <Gradient />

    <!-- Social Icons -->
    <Socials />

    <!-- Scroll Arrow -->
    <Arrow />

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
    </section>

    <!-- Experience -->
    <section id="experience">
        <div class="experience-container">
            <div class="sideways">Experience</div>
            <ul class="timeline">
                <Timeline
                    date="MAY-JUN 2023 & 2024"
                    title="Software Engineer, Intern"
                    at="RTX"
                    desc="Worked on X-Band Radar software. Learned Ada language, ClearCase, Jenkins to support correcting software bugs and new development. Assisted in redevelopment of tool allowing better testing of capabilities of radar software. Participated in daily scrum, sprint planning and backlog refinement"
                />
                <Timeline
                    date="SEP 2022-PRESENT"
                    title="Autobike Project Team"
                    at="Cornell Autobike"
                    desc="Member of the Navigation team. Reinforcement learning to determine optimal bicycle routing, Docker, Python. Optical flow and computer vision techniques to predict future occupancy grids, OpenCV"
                />
                <Timeline
                    date="2022"
                    title="Software Testing Intern"
                    at="Tholyl"
                    desc="Tested and reported bugs, provided insight into development of software product. Managed website"
                />
            </ul>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects"></section>
</body>
