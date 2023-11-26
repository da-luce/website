<script>
    import Gradient from "./Gradient.svelte";
    import Link from "./Link.svelte";
</script>

<Gradient />
<div class="container">
    <div class="name-text">Dalton<br />Luce</div>
    <div class="text-box">
        I am an Electrical and Computer Engineering undergraduate
        <Link text="@Cornell" href="https://www.engineering.cornell.edu/" />,
        actively engaged with the Cornell
        <Link text="@IEEE" href="https://www.cornellieee.com/" /> chapter, and contributing
        to innovations at the
        <Link text="@Autobike" href="https://www.cuautobike.org/" /> project team.
        Currently, I'm expanding my software engineering expertise as an intern
        <Link text="@RTX" href="https://www.rtx.com/" />.
    </div>
</div>

<style>
    .container {
        position: absolute;
        left: 2em; /* Adjust as needed */
        top: 2em; /* Adjust as needed */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        pointer-events: none; /* Passes through the mouse events */
    }

    .name-text {
        color: var(--foreground);
        font-size: 6em;
        margin-bottom: 10px; /* Space between name and text box */
        font-family: "Yeseva One", serif;
    }

    .text-box {
        pointer-events: auto; /* Enable pointer events for the name text */
        width: 30rem;
        font-family: "Lucida Console", monospace;
        font-weight: normal;
        font-size: 1rem;
        color: var(--foreground);
        line-height: 2.5rem; /*Increase line height to avoid "link" borders overlapping */
    }
</style>
