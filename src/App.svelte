<script lang="ts">
    import Socials from "./lib/Socials.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import GradientBackground from "./lib/GradientBackground.svelte";
    import Project from "./lib/Project.svelte";
    import Link from "./lib/Link.svelte";
    import ArrowLink from "./lib/ArrowLink.svelte";
    import Footer from "./lib/Footer.svelte";
</script>

<head>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Yeseva+One&display=swap"
        rel="stylesheet"
    />
</head>

<body>
    <GradientBackground />
    <Socials />
    <Arrow />

    <section id="landing">
        <div>
            <h1 style="color: var(--foreground);">Dalton</h1>
            <h1 style="color: transparent;">Luce</h1>
            <p id="subheading">
                Electrical and Computer Engineering undergraduate at <Link
                    text="Cornell"
                    href="https://www.engineering.cornell.edu/"
                />, actively engaged with the Cornell
                <Link text="IEEE" href="https://www.cornellieee.com/" /> chapter,
                and contributing to innovations on the
                <Link text="Autobike" href="https://www.cuautobike.org/" /> project
                team. Currently, I'm expanding my software engineering expertise
                as an intern at
                <Link text="RTX" href="https://www.rtx.com/" />. Feel free to
                read my
                <ArrowLink
                    href="https://raw.githubusercontent.com/da-luce/cv/main/assets/dalton_luce_cv.pdf"
                    ><p style="text-decoration: underline;">
                        full resume!
                    </p></ArrowLink
                >
            </p>
        </div>
    </section>

    <section id="projects">
        <div id="projects-container">
            <h2>Projects</h2>
            <Project
                videoSrc="/starsaver_small.mov"
                title="Starsaver"
                desc="I've always been interested in the command line—the power of ASCII characters and a limited selection of colors to portray more than just text. Starsaver enables users to display the positions of stars in real-time. This project allowed me to explore C programming deeply, combining my interests in astronomy and coding to create a compelling CLI tool. Through Starsaver, users can bring the beauty of the night sky right to their terminals."
                tags={["C", "Meson", "ncurses"]}
                href="https://github.com/da-luce/starsaver"
            />
            <Project
                videoSrc="/website.mov"
                title="Personal Website"
                desc="The website you're looking at right now! Though an engineer by study, I've always had a soft spot for clean, beautiful UIs. This is my crack at one using Svelte (my fav♡rite JS framework). Here, you'll find my projects as well as other works that highlight my journey in programming and design. Explore, enjoy, and get inspired!"
                tags={["JavaScript", "TypeScript", "HTML & CSS", "Svelte 4.0"]}
                href=""
            />
            <Project
                videoSrc=""
                title="More coming soon!"
                desc="Feel free to drop a st☆r or two :)"
                tags={[]}
                href="https://github.com/da-luce/"
            />
        </div>
    </section>

    <Footer />
</body>
