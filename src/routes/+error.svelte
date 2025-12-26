<script>
    import { page } from '$app/stores'
</script>

<div class="container">
    <div class="error">
        <h1 id="status">{$page.status}</h1>
        <h2 id="message">{$page.error?.message} :(</h2>
    </div>
</div>

<style>
    .container {
        height: 100vh; /* Full viewport height */
        display: grid;
        place-items: center; /* Centers both vertically and horizontally */
    }

    .error {
        text-align: right;
    }

    /* FIXME: this effect is super blurry on Safari */
    #status {
        font-family: var(--title-font);
        font-size: var(--size-1);
        font-weight: bold;
    }

    #message {
        font-family: var(--mono-font);
        font-weight: 200;
        font-size: var(--size-3);
    }
</style>
