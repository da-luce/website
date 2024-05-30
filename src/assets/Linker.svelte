<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1rem">
    <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
</svg>

<style>
    svg {
        fill: var(--foreground);
        position: relative; /* Make the element's position relative to allow absolute positioning */
        transition: transform 0.3s ease; /* Smooth transition for the transform */
    }

    svg:hover {
        transform: translate(
            5px,
            -5px
        ); /* Move the arrow up by 5px and to the right by 5px */
        cursor: pointer;
    }
</style>
