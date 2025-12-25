<script lang="ts">
    import { onMount } from 'svelte'
    import HamburgerMenu from './HamburgerMenu.svelte'

    let activeSection = $state('landing')
    let isMenuOpen = $state(false)

    const sections = [
        { id: 'landing', label: 'Home' },
        { id: 'about', label: 'Background' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ]

    onMount(() => {
        // Intersection Observer for scroll spy
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.25, 0.5, 0.75, 1.0],
        }

        let maxVisibleSection = { id: 'landing', ratio: 0 }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Track which section has the largest intersection ratio
                    if (entry.intersectionRatio > maxVisibleSection.ratio) {
                        maxVisibleSection = {
                            id: entry.target.id,
                            ratio: entry.intersectionRatio,
                        }
                    }
                }
            })

            // Update active section based on the most visible one
            if (maxVisibleSection.ratio > 0.3) {
                activeSection = maxVisibleSection.id
            }

            // Reset for next observation cycle
            maxVisibleSection = { id: activeSection, ratio: 0 }
        }

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        )

        // Observe all sections
        sections.forEach((section) => {
            const element = document.getElementById(section.id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            observer.disconnect()
        }
    })

    function handleClick(sectionId: string) {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        // Close menu on mobile after clicking
        isMenuOpen = false
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen
    }

    function closeMenu() {
        isMenuOpen = false
    }
</script>

<!-- Mobile hamburger button -->
<HamburgerMenu isOpen={isMenuOpen} onToggle={toggleMenu} />

<!-- Mobile overlay -->
{#if isMenuOpen}
    <div class="menu-overlay" onclick={closeMenu}></div>
{/if}

<nav class="side-navigation" class:open={isMenuOpen}>
    {#each sections as section}
        <button
            class="nav-item"
            class:active={activeSection === section.id}
            onclick={() => handleClick(section.id)}
        >
            <span class="dot"></span>
            <span class="label">{section.label}</span>
        </button>
    {/each}
    <a href="/posts" class="nav-item" onclick={closeMenu}>
        <span class="dot"></span>
        <span class="label">Blog</span>
    </a>
</nav>

<style>
    /* Overlay backdrop */
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

    /* Side navigation - desktop style */
    .side-navigation {
        position: fixed;
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 2rem;
        z-index: 1000;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }

    /* Mobile styles */
    @media (max-width: 1024px) {
        .side-navigation {
            right: 0;
            top: 0;
            transform: translateX(100%);
            opacity: 0;
            pointer-events: none;
            background: var(--background-primary);
            padding: 2rem 1.5rem;
            height: 100vh;
            justify-content: center;
            border-radius: 0;
        }

        .side-navigation.open {
            opacity: 1;
            transform: translateX(0);
            pointer-events: auto;
        }

        .side-navigation {
            gap: 1.5rem;
        }
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem 0;
        text-decoration: none;
        transition: all 0.3s ease;
        text-shadow: 0px 0px 3px var(--background-primary);
    }

    .nav-item:hover .label {
        color: var(--foreground-secondary);
        transform: translateX(-2px);
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 2px solid var(--foreground-secondary);
        background: transparent;
        transition: all 0.3s ease;
        flex-shrink: 0;
        box-shadow: 0px 0px 3px var(--background-primary);
    }

    .nav-item.active .dot {
        background: var(--foreground-secondary);
        border-color: var(--foreground-secondary);
        transform: scale(1.3);
    }

    .label {
        font-family: var(--mono-font);
        font-size: var(--size-6);
        color: var(--foreground-secondary);
        transition: all 0.3s ease;
        white-space: nowrap;
        font-weight: 500;
    }

    .nav-item.active .label {
        color: var(--foreground-secondary);
        font-weight: 600;
    }

    @media (max-width: 1024px) {
        .label {
            font-size: 0.9rem;
            color: var(--foreground);
            mix-blend-mode: normal;
        }

        .nav-item .label {
            color: var(--foreground);
            mix-blend-mode: normal;
        }

        .nav-item.active .label {
            color: var(--foreground);
            mix-blend-mode: normal;
        }
    }
</style>
