<script lang="ts">
    interface Props {
        isOpen?: boolean
        onToggle?: () => void
    }

    let { isOpen = false, onToggle }: Props = $props()
</script>

<!-- Hamburger Button -->
<button class="hamburger-button" onclick={onToggle} aria-label="Menu">
    <div class="hamburger-icon" class:open={isOpen}>
        <span></span>
        <span></span>
        <span></span>
    </div>
</button>

<style>
    .hamburger-button {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        width: 3rem;
        height: 3rem;
        background-color: var(--background-primary);
        border: 2px solid var(--foreground);
        border-radius: 50%;
        cursor: pointer;
        z-index: 1001;
        padding: 0;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .hamburger-button:hover {
        transform: scale(1.1);
    }

    .hamburger-icon {
        --icon-height: 1.5rem;
        --line-height: 3px;
        --icon-width: 2rem;

        width: var(--icon-width);
        height: var(--icon-height);
        position: relative;
    }

    .hamburger-icon span {
        display: block;
        position: absolute;
        width: 100%;
        height: var(--line-height);
        background-color: var(--foreground);
        border-radius: 2px;
        transition: all 0.3s ease;
        left: 0;
    }

    .hamburger-icon span:nth-child(1) {
        top: 0;
    }

    .hamburger-icon span:nth-child(2) {
        top: calc((var(--icon-height) - var(--line-height)) / 2);
    }

    .hamburger-icon span:nth-child(3) {
        bottom: 0;
    }

    /* Animated hamburger to X */
    .hamburger-icon.open span:nth-child(1) {
        top: calc((var(--icon-height) - var(--line-height)) / 2);
        transform: rotate(45deg);
    }

    .hamburger-icon.open span:nth-child(2) {
        opacity: 0;
    }

    .hamburger-icon.open span:nth-child(3) {
        bottom: calc((var(--icon-height) - var(--line-height)) / 2);
        transform: rotate(-45deg);
    }

    @media (max-width: 768px) {
        .hamburger-button {
            display: flex;
            width: 2.5rem;
            height: 2.5rem;
        }

        .hamburger-icon {
            --icon-height: 1.2rem;
            --icon-width: 1.5rem;
        }
    }
</style>
