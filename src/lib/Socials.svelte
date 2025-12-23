<script>
    import Jelly from './Jelly.svelte'
    import LinkedInIcon from './icons/LinkedInIcon.svelte'
    import GitHubIcon from './icons/GitHubIcon.svelte'
    import MailIcon from './icons/MailIcon.svelte'
</script>

<div id="container">
    <Jelly defaultGap={1}>
        <LinkedInIcon />
        <GitHubIcon />
        <MailIcon />
    </Jelly>
</div>

<style>
    #container {
        position: fixed;
        top: 5em;
        right: 5em;
        z-index: 1; /* FIXME: needed for hover to work */
    }

    @media (max-width: 1100px) {
        #container {
            display: none;
        }
    }
</style>
