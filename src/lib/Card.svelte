<script lang="ts">
    export let name = "Project";
    export let disc = "blah blah blah...";
    export let img = "stars.png";
    export let link = "https://github.com/";
    let imgPath = `/src/assets/${img}`;

    let container;

    function handleMouseMove(event: MouseEvent) {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const rotateX = (deltaY / centerY) * 5;
        const rotateY = (deltaX / centerX) * -5;

        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    function handleMouseLeave() {
        container.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1.0)";
    }
</script>

<a
    href={link}
    target="_blank"
    class="container"
    bind:this={container}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
>
    <div class="name">{name}</div>
    <img src={imgPath} alt="Project" />
    <p class="description">{disc}</p>
</a>

<style>
    .container {
        background: var(--foreground);
        border: 2px solid grey;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 300px;
        min-height: 20vh;
        box-sizing: border-box;
        display: flex;
        margin: 10px; /* for when we transform */
        flex-direction: column;
        align-items: left;
        transition:
            transform 0.1s ease,
            box-shadow 0.3s ease;
        text-decoration: none;
        color: inherit;
        transform-style: preserve-3d; /* Required for perspective to work */
    }

    .container:hover {
        transform: scale(2);
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 10px 10px 0 0;
    }

    .description {
        font-size: 1em;
        font-family: var(--mono-font);
        margin: 10px 0;
        text-align: left;
        overflow: hidden; /* Hide overflow */
        text-overflow: ellipsis; /* Show ellipsis when text overflows */
        display: -webkit-box; /* Use WebKit box model */
        -webkit-box-orient: vertical; /* Set box orientation to vertical */
        -webkit-line-clamp: 3; /* Limit the number of lines */
        max-height: 4.5em; /* Set max height based on line-height (1.5em * 3 lines) */
        line-height: 1.5em; /* Set line-height */
    }

    .name {
        font-size: 1.5em;
        font-family: var(--mono-font);
        color: rgb(54, 54, 54);
        text-align: left;
        font-weight: bold;
    }
</style>
