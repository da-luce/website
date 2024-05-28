<script>
    export let date = "2000 - 2000";
    export let title = "Title";
    export let at = "Company/Institution";
    export let desc = "...";
</script>

<div class="container">
    <div class="date">
        {date}
    </div>
    <div class="main">
        <div class="title-container">
            <div class="title">{title}</div>
            <div class="at">• {at}</div>
        </div>
        <div class="desc">{desc}</div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 20px;
        border-radius: 20px;
        max-width: 50vw;
        opacity: 0.7;
        transition:
            opacity 0.3s,
            border 0.3s;
        border: 2px solid transparent;
    }

    .container:hover {
        opacity: 1;
        cursor: pointer;
    }

    .date {
        position: relative;
        opacity: 0.8;
        font-family: var(--reddit-font);
        color: var(--foreground);
        font-weight: bold;
        padding-right: 20px;
        min-width: 110px;
        text-align: right;
    }

    .main {
        display: flex;
        flex-direction: column;
    }

    .title-container {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 1.4em;
        color: var(--foreground);
        font-family: var(--fancy-font);
        margin-right: 10px;
    }

    .at {
        font-size: 1.4em;
        color: var(--foreground);
        font-family: var(--fancy-font);
        transition: color 0.3s;
    }

    .container:hover .at {
        color: #81d4fd;
    }

    .desc {
        opacity: 0.9;
        font-family: var(--reddit-font);
        font-size: 1em;
        color: var(--foreground);
        margin-top: 0.5em;
        line-height: 2em;
    }
</style>
