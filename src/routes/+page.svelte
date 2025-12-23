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

    // Timeline data for About Me section
    const timelineItems: TimelineItem[] = [
        {
            title: 'Background',
            titleStyle:
                'font-size: var(--size-2); margin-top: -2rem; mix-blend-mode: var(--blend-mode);',
            image: '/profile.png',
            imageSize: '16rem',
            date: null,
            showDot: false,
            imageStyle:
                'border-radius: 50%; box-shadow: 0 0 10px var(--background-primary); margin-top: 5rem;',
            description:
                "I'm a student and software engineer who loves automating everyday life with tech. I enjoy building tools that make tasks easier, and I also tinker with cool side projects like astroterm. Lately, I've been diving into cloud technologies and exploring how they can power larger ideas. When I'm not coding, you can usually find me skiing, mountain biking, or making pickles!",
        },
        {
            title: 'Cornell University M.Eng CS',
            image: '/icons/cornell.svg',
            imageSize: '4rem',
            opacity: 0.6,
            date: 'Future - Spring 2026',
            description:
                'Will be continuing my education with a one year Master of Engineering program in Computer Science at Cornell University.',
        },
        {
            title: 'Databricks SWE Intern',
            image: '/icons/databricks.svg',
            opacity: 0.6,
            date: 'Future - Summer 2026',
            description:
                "I'm excited to be joining Databricks as a Software Engineer Intern in the summer of 2026!",
        },
        {
            title: 'Cornell University B.S. ECE',
            image: '/icons/cornell.svg',
            imageSize: '4rem',
            date: 'Class of 2026',
            description:
                'Graduated from Cornell University with a Bachelor of Science in Electrical and Computer Engineering with a minor in Computer Science.',
        },
        {
            title: 'Amazon Web Services SDE Intern',
            image: '/icons/aws.svg',
            date: 'Summer 2025',
            description: 'Worked on the AWS Managed Streaming Kafka team.',
        },
        {
            title: 'Raytheon Technologies SWE Intern',
            image: '/icons/rtx.svg',
            imageSize: '6rem',
            date: 'Summer 2024',
            description:
                'DevOps internship focused on automating and improving internal tools, migration to Jira and GitLab.',
        },
        {
            title: 'Raytheon Technologies SWE Intern',
            image: '/icons/rtx.svg',
            imageSize: '6rem',
            date: 'Summer 2024',
            description:
                'Radar software internship focused on bug fixing in ADA.',
        },
    ]
</script>

<SideNavigation />

<div id="page">
    <GradientBackground
        numPoints={4}
        leftBarrier={0.8}
        rightBarrier={1.0}
        topBarrier={1.0}
        bottomBarrier={0.6}
        fixedPoints={[
            { index: 0, x: 1.0, y: 1.0 },
            { index: 1, x: 1.0, y: 0.6 },
        ]}
        canvasTop="0"
        canvasRight="0"
        canvasBottom="auto"
        canvasLeft="auto"
        canvasWidth="100vw"
        canvasHeight="200vh"
    />

    <!-- Bottom of first gradient -->
    <Divider
        position="absolute"
        top="200dvh"
        left="0"
        width="100%"
        zIndex="0"
    />

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
        canvasPosition="absolute"
        canvasTop="auto"
        canvasRight="auto"
        canvasBottom="0"
        canvasLeft="0"
        canvasWidth="100vw"
        canvasHeight="200vh"
    />

    <!-- Top edge of second gradient -->
    <Divider
        position="absolute"
        bottom="200vh"
        left="0"
        width="100%"
        zIndex="0"
    />

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
            </p>
        </div>
    </section>

    <section id="about">
        <div class="timeline-wrapper">
            <Timeline items={timelineItems} topStyle="fade" />
        </div>
    </section>

    <section id="projects">
        <div id="projects-container">
            <h2 style="mix-blend-mode: var(--blend-mode);">
                Selected Projects
            </h2>
            <div class="projects-grid">
                <ProjectCard
                    imageSrc="/blog.jpeg"
                    title="Blog"
                    description="Exploring tech, programming, and engineering through articles and tutorials."
                    href="/posts"
                />
                <ProjectCard
                    imageSrc="/astroterm.png"
                    title="Astroterm"
                    description="A CLI tool that displays star positions in real-time using C and ncurses."
                    href="https://github.com/da-luce/astroterm"
                />
                <ProjectCard
                    imageSrc="/website.png"
                    title="Personal Website"
                    description="A clean, minimalistic portfolio built with SvelteKit and modern web technologies."
                    href="https://github.com/da-luce/website"
                />
            </div>
        </div>
    </section>

    <section id="contact">
        <div id="contact-container">
            <h2 style="mix-blend-mode: var(--blend-mode);">Get in Touch</h2>
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
    #page {
        position: relative; /* anchor for absolute canvas */
        min-height: 200vh; /* MUST be taller than viewport */
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
        margin-left: -5rem; /* FIXME: hack to get timeline looking better */
    }

    .link {
        margin: 0 0.5em;
        mix-blend-mode: var(--blend-mode);
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
        height: 100vh;
    }

    #subheading {
        line-height: 2.5rem;
        /*Align text left */
        text-align: left;
        color: var(--foreground-secondary);
        /* Take entire space of div, evenly spaced */
        display: flex;
        justify-content: left;
        gap: 1.5em;
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
        font-weight: 400;
        color: var(--foreground);
        transition: color 0.3s ease;
    }

    .contact-item:hover .contact-text {
        color: var(--foreground-secondary);
    }

    @media (max-width: 768px) {
        #contact {
            margin-top: 5em;
        }
    }
</style>
