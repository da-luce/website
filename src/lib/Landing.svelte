<script>
    import Gradient from "./Gradient.svelte";
    import Link from "./Link.svelte";
    import Arrow from "./Arrow.svelte";
</script>

<!-- Background canvas -->
<Gradient />

<!-- Name and info -->
<div class="container">
    <div class="first-name">Dalton</div>
    <div class="last-name">Luce</div>
    <div class="text-box">
        I'm an Electrical and Computer Engineering undergraduate
        <Link text="@Cornell" href="https://www.engineering.cornell.edu/" />,
        actively engaged with the Cornell
        <Link text="@IEEE" href="https://www.cornellieee.com/" /> chapter, and contributing
        to innovations on the
        <Link text="@Autobike" href="https://www.cuautobike.org/" /> project team.
        Currently, I'm expanding my software engineering expertise as an intern
        <Link text="@RTX" href="https://www.rtx.com/" />.
    </div>
</div>

<!-- Scroll down arrow -->
<div class="arrow-container"><Arrow /></div>

<style>
    .arrow-container {
        position: absolute;
        bottom: 20px; /* Adjust as needed */
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        position: absolute;
        left: 2em;
        top: 2em;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        pointer-events: none; /* Passes through the mouse events */
    }

    .first-name {
        color: var(--foreground);
        font-size: 6em;
        margin-bottom: 10px; /* Space between name and text box */
        font-family: "Yeseva One", serif;
        /* font-family: "EB Garamond", serif; */
    }

    .last-name {
        color: rgba(0, 0, 0, 0); /* Transparent fill */
        font-size: 6em;
        margin-bottom: 10px; /* Space between name and text box */
        font-family: "Yeseva One", serif;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: var(--foreground);
    }
    /* font-family: "EB Garamond", serif; */

    .text-box {
        pointer-events: auto; /* Enable pointer events for the name text */
        width: 30rem;
        font-family: "Lucida Console", monospace;
        font-weight: normal;
        font-size: 1rem;
        color: var(--foreground);
        line-height: 2.5rem; /*Increase line height to avoid "link" borders overlapping */
        pointer-events: none; /* Passes through the mouse events */
    }
</style>
