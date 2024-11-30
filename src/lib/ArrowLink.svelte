<script lang="ts">
    export let href: string
</script>

<a {href} target="_blank">
    <slot></slot>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
    </svg>
</a>

<style>
    a {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        align-items: center;
        gap: 5px;
        text-decoration: none;
        color: inherit; /* Keep normal text color */
    }

    svg {
        fill: var(--foreground);
        transition: transform 0.3s ease;
        height: 1em;
        width: auto; /* Maintain aspect ratio */
    }

    a:hover svg {
        transform: translate(
            5px,
            -5px
        ); /* Move the arrow up by 5px and to the right by 5px */
    }
</style>
