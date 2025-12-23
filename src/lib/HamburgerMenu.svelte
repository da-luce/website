<script lang="ts">
    let isOpen = $state(false)

    function toggleMenu() {
        isOpen = !isOpen
    }

    function closeMenu() {
        isOpen = false
    }
</script>

<!-- Hamburger Button -->
<button class="hamburger-button" onclick={toggleMenu} aria-label="Menu">
    <div class="hamburger-icon" class:open={isOpen}>
        <span></span>
        <span></span>
        <span></span>
    </div>
</button>

<!-- Menu Overlay -->
{#if isOpen}
    <div class="menu-overlay" onclick={closeMenu}></div>
{/if}

<!-- Menu Panel -->
<nav class="menu-panel" class:open={isOpen}>
    <div class="menu-content">
        <a href="#about" onclick={closeMenu}>Background</a>
        <a href="#projects" onclick={closeMenu}>Projects</a>
        <a href="#contact" onclick={closeMenu}>Contact</a>
        <a href="/posts" onclick={closeMenu}>Blog</a>
    </div>
</nav>

<style>
    .hamburger-button {
        position: fixed;
        top: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 1001;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .hamburger-button:hover {
        transform: scale(1.1);
    }

    .hamburger-icon {
        width: 2rem;
        height: 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .hamburger-icon span {
        display: block;
        width: 100%;
        height: 3px;
        background-color: var(--foreground);
        border-radius: 2px;
        transition: all 0.3s ease;
        transform-origin: center;
    }

    /* Animated hamburger to X */
    .hamburger-icon.open span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }

    .hamburger-icon.open span:nth-child(2) {
        opacity: 0;
    }

    .hamburger-icon.open span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }

    .menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .menu-panel {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        height: 100%;
        background-color: var(--background-primary);
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-panel.open {
        transform: translateX(0);
    }

    .menu-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        width: 100%;
    }

    .menu-content a {
        font-family: var(--title-font);
        font-size: var(--size-4);
        font-weight: 600;
        color: var(--foreground);
        text-decoration: none;
        text-align: center;
        padding: 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
        mix-blend-mode: var(--blend-mode);
    }

    .menu-content a:hover {
        background-color: var(--background-secondary);
        transform: translateX(-5px);
    }

    @media (max-width: 768px) {
        .hamburger-button {
            top: 1.5rem;
            right: 1.5rem;
            width: 2.5rem;
            height: 2.5rem;
        }

        .hamburger-icon {
            width: 1.5rem;
            height: 1.2rem;
        }

        .hamburger-icon.open span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }

        .hamburger-icon.open span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }

        .menu-panel {
            width: 250px;
        }

        .menu-content a {
            font-size: var(--size-5);
        }
    }
</style>
