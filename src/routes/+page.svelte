<script lang="ts">
    import Socials from '$lib/Socials.svelte'
    import Arrow from '$lib/Arrow.svelte'
    import GradientBackground from '$lib/GradientBackground.svelte'
    import ProjectCard from '$lib/ProjectCard.svelte'
    import Link from '$lib/Link.svelte'
    import Footer from '$lib/Footer.svelte'
    import Timeline from '$lib/Timeline.svelte'
    import type { TimelineItem } from '$types/shared'
    import Divider from '$lib/Divider.svelte'
    import LinkedInIcon from '$lib/icons/LinkedInIcon.svelte'
    import GitHubIcon from '$lib/icons/GitHubIcon.svelte'
    import MailIcon from '$lib/icons/MailIcon.svelte'
    import SideNavigation from '$lib/SideNavigation.svelte'
    import ArrowLink from '$lib/ArrowLink.svelte'
    import HoverGroup from '$lib/HoverGroup.svelte'
    import ArrowIcon from '$lib/icons/ArrowIcon.svelte'
    import SkillsScroll from '$lib/SkillsScroll.svelte'
    import { BLOB } from '$lib/config'

    // Timeline data for About Me section
    const timelineItems: TimelineItem[] = [
        {
            title: 'Background',
            titleStyle:
                'font-size: var(--size-2); margin-top: -2rem; mix-blend-mode: var(--blend-mode);',
            image: `${BLOB}/images/profile.png`,
            imageSize: '16rem',
            date: null,
            dotStyle: 'invisible',
            imageStyle:
                'border-radius: 50%; box-shadow: 0 0 10px var(--background-primary); margin-top: 5rem;',
            description:
                "I'm a student and software engineer who loves automating everyday life with tech. I enjoy building tools that make tasks easier, and I also tinker with cool side projects. Lately, I've been diving into cloud technologies and exploring how they can power larger ideas. When I'm not coding, you can usually find me skiing, mountain biking, or reading a good book.",
        },
        {
            title: 'Cornell University M.Eng. CS',
            image: `${BLOB}/icons/cornell.svg`,
            imageSize: '4rem',
            dotStyle: 'hollow',
            opacity: 0.6,
            date: 'Fall 2026',
            description:
                'I am pursuing a one-year Master of Engineering in Computer Science at Cornell University, graduating in Fall 2026.',
        },
        {
            title: 'Databricks SWE Intern',
            image: `${BLOB}/icons/databricks.svg`,
            opacity: 0.6,
            dotStyle: 'hollow',
            date: 'Summer 2026',
            description:
                "I'm excited to be joining Databricks as a Software Engineer Intern for the summer of 2026!",
        },
        {
            title: 'Cornell University B.S. ECE',
            image: `${BLOB}/icons/cornell.svg`,
            date: 'Class of 2026',
            imageSize: '4rem',
            description:
                'Graduated from Cornell University with a Bachelor of Science in Electrical and Computer Engineering with a minor in Computer Science.',
        },
        {
            title: 'Amazon Web Services SDE Intern',
            image: `${BLOB}/icons/aws.svg`,
            date: 'Summer 2025',
            description:
                'Built critical testing frameworks for AWS Managed Streaming Kafka (MSK), enabling faster local workflow validation and unblocking key CI/CD pipelines.',
        },
        {
            title: 'Raytheon Technologies SWE Intern',
            image: `${BLOB}/icons/rtx.svg`,
            imageSize: '6rem',
            date: 'Summer 2024',
            description:
                'DevOps internship focused on automating and improving internal tools, supporting migration to Jira and GitLab.',
        },
        {
            title: 'Raytheon Technologies SWE Intern',
            image: `${BLOB}/icons/rtx.svg`,
            imageSize: '6rem',
            date: 'Summer 2024',
            description:
                'Worked on radar software, fixing ADA bugs and improving system reliability.',
        },
    ]
</script>

<SideNavigation />

<div id="page">
    <GradientBackground
        numPoints={4}
        leftBarrier={0.6}
        rightBarrier={1.0}
        topBarrier={1.0}
        bottomBarrier={0.6}
        fixedPoints={[
            { index: 0, x: 1.0, y: 1.0 },
            { index: 1, x: 1.0, y: 0.6 },
        ]}
        class="gradient gradient-top-right"
    />

    <Divider class="divider divider-top" />

    <GradientBackground
        numPoints={4}
        leftBarrier={0.0}
        rightBarrier={0.3}
        topBarrier={0.5}
        bottomBarrier={0.0}
        fixedPoints={[
            { index: 0, x: 0.0, y: 0.0 },
            { index: 1, x: 0.0, y: 0.5 },
            { index: 2, x: 0.3, y: 0.0 },
        ]}
        class="gradient gradient-bottom-left"
    />

    <Divider class="divider divider-bottom" />

    <Arrow />

    <section id="landing">
        <div>
            <h1><span class="last-name">Hi,</span> I'm</h1>
            <h1>
                Dalton <span
                    class="hand"
                    style="font-size: 0.5em; vertical-align: middle;">👋</span
                >
            </h1>
            <p id="subheading" class="link">
                <Link text="Background" href="#about" />
                <Link text="Projects" href="#projects" />
                <Link text="Contact" href="#contact" />
                <Link
                    text="Resume"
                    href="https://cdn.daltonluce.com/cv/pdfs/dalton_luce_cv.pdf"
                />
            </p>
        </div>
    </section>

    <section id="about">
        <div>
            <div class="mobile-profile-photo">
                <img src="{BLOB}/images/profile.png" alt="Profile" />
            </div>
            <div class="timeline-wrapper">
                <Timeline items={timelineItems} topStyle="fade" />
            </div>
            <HoverGroup>
                <div>
                    <a
                        href="https://cdn.daltonluce.com/cv/pdfs/dalton_luce_cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="text-decoration: none;"
                    >
                        <span class="resume" style="opacity: 0.8;">
                            <p>Full Resume</p>
                            <div class="hover-move arrow-container">
                                <ArrowIcon />
                            </div>
                        </span>
                    </a>
                </div>
            </HoverGroup>
        </div>
        <SkillsScroll />
    </section>

    <section id="projects">
        <div id="projects-container">
            <h2 style="mix-blend-mode: var(--blend-mode);">
                <span
                    class="last-name"
                    style="-webkit-text-stroke: 2px var(--foreground-secondary); -webkit-text-stroke-color: var(--foreground-secondary); fill: transparent;"
                    >Selected</span
                > Projects
            </h2>
            <div class="projects-grid">
                <ProjectCard
                    imageSrc="{BLOB}/images/blog.jpeg"
                    title="Blog"
                    description="Exploring tech, programming, and engineering through articles and tutorials."
                    href="/posts"
                />
                <ProjectCard
                    imageSrc="{BLOB}/images/astroterm.png"
                    title="Astroterm"
                    description="A CLI tool that displays star positions in real-time using C and ncurses."
                    href="https://github.com/da-luce/astroterm"
                />
                <ProjectCard
                    imageSrc="{BLOB}/images/website.png"
                    title="Personal Website"
                    description="A clean, minimalistic portfolio built with SvelteKit and modern web technologies."
                    href="https://github.com/da-luce/website"
                />
            </div>
        </div>
    </section>

    <section id="contact">
        <div id="contact-container">
            <h2 style="mix-blend-mode: var(--blend-mode);">
                Connect
                <span
                    class="last-name"
                    style="-webkit-text-stroke: 2px var(--foreground-secondary); -webkit-text-stroke-color: var(--foreground-secondary); fill: transparent;"
                    >With Me</span
                >
            </h2>
            <p id="contact-description">
                I'm always open to new opportunities, collaborations, or just a
                friendly chat about tech. Feel free to reach out!
            </p>
            <div class="contact-content">
                <a
                    href="mailto:daltonluce42@gmail.com"
                    class="contact-item"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="contact-icon">
                        <MailIcon />
                    </div>
                    <span class="contact-text">daltonluce42@gmail.com</span>
                </a>
                <a
                    href="https://linkedin.com/in/dalton-luce"
                    class="contact-item"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="contact-icon">
                        <LinkedInIcon />
                    </div>
                    <span class="contact-text">linkedin.com/in/dalton-luce</span
                    >
                </a>
                <a
                    href="https://github.com/da-luce"
                    class="contact-item"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="contact-icon">
                        <GitHubIcon />
                    </div>
                    <span class="contact-text">github.com/da-luce</span>
                </a>
            </div>
        </div>
    </section>

    <Footer />
</div>

<style>
    :global(.gradient) {
        position: absolute;
        width: 100dvw;
        height: 200dvh;
        z-index: 0;
    }

    :global(.divider) {
        --divider-height: 30rem;
        position: absolute;
        width: 100%;
        left: 0;
        height: var(--divider-height);
        z-index: 0;
    }

    :global(.gradient-top-right) {
        top: 0;
        right: 0;
    }

    :global(.gradient-bottom-left) {
        bottom: 0;
        left: 0;
    }

    :global(.divider-top) {
        top: calc(200dvh - var(--divider-height) / 2);
    }

    :global(.divider-bottom) {
        bottom: calc(200dvh - var(--divider-height) / 2);
    }

    #page {
        position: relative; /* anchor for absolute canvas */
        min-height: 200dvh; /* MUST be taller than viewport */
        overflow-x: hidden;
    }
    #last-name,
    h1 {
        font-size: var(--size-1);
        font-weight: 800;
    }

    h2 {
        font-family: var(--title-font);
        font-weight: bold;
        font-size: var(--size-2);
    }
    p {
        font-weight: 100;
    }
    .last-name {
        color: transparent; /* or any visible color; mix-blend-mode will invert it */
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: var(--foreground); /* optional outline */
        mix-blend-mode: var(--blend-mode);
    }

    .arrow-container {
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center; /* vertically center */
        justify-content: center; /* horizontally center */
    }

    .hand {
        /* Wave on hover */
        display: inline-block;
        transition: transform 0.3s linear;
    }

    .hand:hover {
        animation: wave 1s infinite;
    }

    @keyframes wave {
        0% {
            transform: rotate(0deg);
        }
        20% {
            transform: rotate(-20deg);
        }
        40% {
            transform: rotate(20deg);
        }
        60% {
            transform: rotate(-20deg);
        }
        100% {
            transform: rotate(0deg);
        }
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

    section > div:first-child {
        max-width: 50em;
        width: 100%;
        margin: 0 auto;
    }

    #about {
        height: auto;
        min-height: 35rem;
        margin-top: 15rem;
        padding-bottom: 3rem;
        /* margin-left: -5rem; FIXME: hack to get timeline looking better */
    }

    .link {
        margin: 0 0.5em;
        mix-blend-mode: var(--blend-mode);
    }
    .resume {
        display: flex; /* use flex instead of inline-flex */
        justify-content: center; /* center children horizontally */
        align-items: center; /* vertically align arrow and text */
        gap: 0.4rem; /* space between text and arrow */
        margin: 2rem auto; /* auto left/right centers this div in parent */
    }

    .about-container {
        display: flex;
        align-items: center; /* aligns items to top */
        gap: 40px; /* space between image and text */
        max-width: 1000px;
        margin: 0 auto;
        margin-bottom: 4rem;
    }

    .about-image img {
        width: 300px; /* adjust size */
        border-radius: 10px; /* optional rounded corners */
        object-fit: cover;
    }

    #landing {
        height: 100dvh;
    }

    #subheading {
        line-height: 2.5rem;
        /*Align text left */
        text-align: left;
        color: var(--foreground-secondary);
        /* Take entire space of div, evenly spaced */
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        gap: clamp(0.75rem, 2.5vw, 1.5rem);
        margin-top: 0.5em;
    }

    #projects {
        margin-top: 5em;
        /* Add some room to breath */
    }

    #projects-container {
        flex-direction: column;
        align-items: flex-start;
        display: flex;
        gap: 2em;
        width: 100%;
    }

    .projects-grid {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        width: 100%;
        justify-content: left;
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .projects-grid {
            flex-direction: column;
            align-items: center;
        }
    }

    #contact {
        margin-top: 8em;
        margin-bottom: 5em;
    }

    #contact-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5em;
        width: 100%;
        min-height: 50dvh;
    }

    #contact-description {
        color: var(--foreground-secondary);
        font-size: var(--size-5);
        line-height: 1.6;
        margin: 0;
    }

    .contact-content {
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        width: 100%;
        align-items: flex-end;
    }

    .contact-item {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: var(--foreground);
        transition: transform 0.2s ease;
    }

    .contact-item:hover {
        transform: translateX(-4px);
    }

    .contact-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .contact-text {
        font-family: var(--mono-font);
        font-size: var(--size-5);
        font-weight: 300;
        color: var(--foreground-secondary);
        transition: color 0.3s ease;
        text-decoration: underline;
    }

    .contact-item:hover .contact-text {
        color: var(--foreground-secondary);
    }

    @media (max-width: 768px) {
        #contact {
            margin-top: 5em;
        }
    }

    /* Mobile profile photo - hidden on desktop, visible on mobile */
    .mobile-profile-photo {
        display: none;
    }

    @media (max-width: 768px) {
        .mobile-profile-photo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;
            width: 100%;
        }

        .mobile-profile-photo img {
            width: 70%;
            max-width: 25rem;
            height: auto;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            box-shadow: 0 0 10px var(--background-primary);
            object-fit: cover;
            margin-bottom: 2rem;
        }
    }
</style>
