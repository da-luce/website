<script lang="ts">
    import Landing from "./lib/Landing.svelte";
    import Socials from "./lib/Socials.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Gradient from "./lib/Gradient.svelte";
    import Project from "./lib/Project.svelte";
    import Footer from "./lib/Footer.svelte";
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

<body>
    <Gradient />
    <Socials />
    <Arrow />
    <Landing />

    <section id="projects">
        <Project
            videoSrc="src/assets/starsaver.mov"
            title="Starsaver"
            desc="I've always been interested in the command line—the power of ASCII characters and a limited selection of colors to portray more than just text. Starsaver enables users to display the positions of stars in real-time. This project allowed me to explore C programming deeply, combining my passion for astronomy and coding to create an engaging and educational tool. Through Starsaver, users can experience the night sky in a unique way, bringing the beauty of the cosmos right to their terminals."
            tags={["C", "Meson", "ncurses"]}
            href="https://github.com/da-luce/starsaver"
        />
        <Project
            videoSrc="src/assets/website.mov"
            title="Personal Website"
            desc="The website you're looking at right now! Though an engineer by study, I've always had a soft spot for clean, beautiful UIs. This is my crack at one using Svelte (my fav♡rite JS framework). Here, you'll find my projects, like Starsaver, as well as other works that highlight my journey in programming and design. Explore, enjoy, and get inspired!"
            tags={["JavaScript", "TypeScript", "HTML & CSS", "Svelte 4.0"]}
            href=""
        />
        <Project
            videoSrc=""
            title="More coming soon!"
            desc="Feel free to drop a star or two :)"
            tags={[]}
            href="https://github.com/da-luce/"
        />
    </section>
    <Footer />
</body>
