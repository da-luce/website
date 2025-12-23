<script>
    import SocialsMobile from './SocialsMobile.svelte'
</script>

<footer>
    <p id="first-line">
        Designed and hand coded by me <span class="emoji">✌️</span>
    </p>
    <div id="socials"><SocialsMobile /></div>
    <p style="opacity: 0.4; mix-blend-mode: var(--blend-mode);">
        © Dalton Luce {new Date().getFullYear()}. All Rights Reserved.
    </p>
</footer>

<style>
    footer {
        position: relative;
        height: 20vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        text-align: center;
        margin: 2em 0;
        cursor: default;
    }

    #socials {
        width: 100%;
        max-width: 20em;
    }

    .emoji {
        font-family:
            apple color emoji,
            segoe ui emoji,
            noto color emoji,
            android emoji,
            emojisymbols,
            emojione mozilla,
            twemoji mozilla,
            segoe ui symbol;
        display: inline-block;
        transition: transform 0.2s ease-in-out;
    }

    #first-line {
        padding: 1em 1em 0em 1em;
    }

    /* Apply animation only when #first-line is hovered */
    #first-line:hover .emoji {
        animation: wave 1.5s infinite;
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
            transform: rotate(-10deg);
        }
        80% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>
