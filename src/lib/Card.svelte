<!-- src/lib/ProjectCard.svelte -->
<script lang="ts">
    export let disc = "blah blah blah...";
    export let img = "./assets/logo.png";
    export let link = "https://github.com/";
</script>

<a href={link} target="_blank" class="container">
    <img src={img} alt="Project" />
    <p class="description">{disc}</p>
</a>

<style>
    .container {
        background: #afafaf;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 300px;
        min-height: 20vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        text-decoration: none;
        color: inherit;
    }
    .container:hover {
        transform: scale(1.05) rotate3d(1, -1, 0, 15deg);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
