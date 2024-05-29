<script lang="ts">
    export let src: string;
    export let alt: string = "";
</script>

<div class="container">
    <div class="background" style="--mask-image: url({src});"></div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 80px;
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
        width: 80%;
        height: 80%;
        filter: grayscale(100%);
        transition: filter 0.3s ease-in-out;
        position: relative;
    }

    .logo:hover {
        filter: none;
    }
</style>
