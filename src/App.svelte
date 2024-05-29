<script lang="ts">
    import Landing from "./lib/Landing.svelte";
    import Socials from "./lib/Socials.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Gradient from "./lib/Gradient.svelte";
    import Timeline from "./lib/Timeline.svelte";
    import Scrolling from "./lib/Scrolling.svelte";
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
    <Scrolling text="Experience" icon="✧" spacing="1px" />
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
</section>

<section id="projects">
    <Scrolling text="Projects" icon="✦" spacing="1px" />
</section>
