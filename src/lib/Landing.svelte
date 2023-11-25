<script>
import Gradient from './Gradient.svelte';
</script>

<style>
    .container {
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .name-text {
        position: absolute;
        top: 0.25em; /* Adjust as needed */
        left: 0.25em; /* Adjust as needed */
        color: #c1c4c5; /* Choose a color that is visible on your gradient */
        font-size: 80px; /* Adjust the size as needed */
        z-index: 1; /* Ensure the text is above the canvas */
        font-family: 'Yeseva One', serif;
        mix-blend-mode: normal; /* Or another blend mode like 'screen', 'multiply', etc. */
    }

</style>

<div class="container">
    <div class="name-text">Dalton<br>Luce</div>
    <div class="text-box">
        Your additional text goes here. You can write anything you like, format it, and style it as needed.
    </div>
    <Gradient />
</div>
