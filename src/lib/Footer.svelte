<footer>
    <p>
        <span id="first-line"
            >Designed and hand coded by me <span class="emoji">✌️</span></span
        >
        <br />
        <span style="opacity: 0.4;"
            >© Dalton Luce 2024. All Rights Reserved.</span
        >
    </p>
</footer>

<style>
    footer {
        height: 20vh;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        text-align: center;
        margin-bottom: 1em;
        cursor: default;
    }

    footer > p:first-child {
        z-index: 1;
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
