<script lang="ts">
    import Socials from "$lib/Socials.svelte";
    import Arrow from "$lib/Arrow.svelte";
    import GradientBackground from "$lib/GradientBackground.svelte";
    import Project from "$lib/Project.svelte";
    import Link from "$lib/Link.svelte";
    import ArrowLink from "$lib/ArrowLink.svelte";
    import Footer from "$lib/Footer.svelte";
</script>

<GradientBackground />
<Socials />
<Arrow />

<section id="landing">
    <div>
        <h1 id="first-name">Dalton</h1>
        <h1 id="last-name">Luce</h1>
        <p id="subheading">
            Electrical and Computer Engineering undergraduate at <Link
                text="Cornell"
                href="https://www.engineering.cornell.edu/"
            />, actively engaged with the Cornell
            <Link text="IEEE" href="https://www.cornellieee.com/" /> chapter,
            and software subteam lead of the
            <Link text="Autobike" href="https://www.cuautobike.org/" /> project
            team. Currently, I'm expanding my software engineering expertise
            as an intern at
            <Link text="Raytheon" href="https://www.rtx.com/raytheon" />.
            Feel free to read my
            <ArrowLink
                href="https://raw.githubusercontent.com/da-luce/cv/main/assets/dalton_luce_cv.pdf"
                ><span style="text-decoration: underline;">
                    full resume!
                </span></ArrowLink
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

<style>

    #last-name, #first-name {
        font-size: var(--size-1);
    }

    #last-name {
        color: transparent;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--foreground);
    }

    section {
        width: 100vw;
        box-sizing: border-box;
        padding: 0 1.5em;
        /* For small screens */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    section>div:first-child {
        max-width: 50em;
        width: 100%;
        margin: 0 auto;
    }

    #landing {
        height: 100vh;
    }

    #subheading {
        line-height: 2.5rem;
        /* Extra room for links */
    }

    #projects {
        margin-top: 5em;
        /* Add some room to breath */
    }

    #projects-container {
        flex-direction: column;
        align-items: flex-start;
        display: flex;
        gap: 4em;
    }
</style>