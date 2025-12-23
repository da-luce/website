<script>
    import LinkedInIcon from './icons/LinkedInIcon.svelte'
    import GitHubIcon from './icons/GitHubIcon.svelte'
    import MailIcon from './icons/MailIcon.svelte'
</script>

<div id="container">
    <LinkedInIcon />
    <GitHubIcon />
    <MailIcon />
</div>

<style>
    #container {
        display: none;
        z-index: 1; /* Required for hover */
    }

    /* Media query for small screens */
    @media (max-width: 1100px) {
        #container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            pointer-events: auto;
            margin: 1em 0;
        }
    }
</style>
