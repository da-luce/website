<script lang="ts">
    export let src: string;
    export let alt: string = "";
</script>

<div class="container">
    <div class="background" style="--mask-image: url({src});"></div>
    <img {src} {alt} class="logo" />
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 8em;
        height: 4em;
        position: relative;
        background-color: transparent;
        border-radius: 1rem;
        transition: all 0.5s;
        padding: 20px;
    }

    .container:hover {
        border-radius: 0.75rem;
        cursor: pointer;
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--foreground);
        -webkit-mask-image: var(--mask-image);
        mask-image: var(--mask-image); /* Use the image as a mask */
        -webkit-mask-size: contain; /* Ensure the mask fits well */
        mask-size: contain; /* Ensure the mask fits well */
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
    }

    .logo {
        width: 100%; /* Ensure the logo takes the full container size */
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .container:hover .logo {
        opacity: 1;
    }
</style>
