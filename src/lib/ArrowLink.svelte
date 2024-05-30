<!-- Link.svelte -->
<script lang="ts">
    export let text: string;
    export let href: string;
</script>

<div id="container">
    <a {href}>
        {text}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            width="20px"
        >
            <path
                d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"
            />
        </svg>
    </a>
</div>

<style>
    #container {
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex; /* so inline with text */
    }

    a {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--foreground);
        transition: color 0.3s ease;
        text-decoration: underline;
        transition: inherit;
    }

    a:hover {
        text-decoration-thickness: 2px;
    }

    svg {
        fill: var(--foreground);
        position: relative;
        transition: inherit;
    }

    a:hover svg {
        transform: translate(
            5px,
            -5px
        ); /* Move the arrow up by 5px and to the right by 5px */
    }
</style>
