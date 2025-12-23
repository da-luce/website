<script lang="ts">
    import { onMount } from 'svelte'

    let activeSection = $state('landing')
    let isVisible = $state(true)
    let scrollTimeout: number | undefined
    let lastScrollY = 0
    const SCROLL_THRESHOLD = 300 // px - minimum scroll distance to show nav

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

        // Also observe landing section
        const landingElement = document.getElementById('landing')
        if (landingElement) {
            observer.observe(landingElement)
        }

        // Mobile scroll behavior - show on scroll, hide after inactivity
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const scrollDelta = Math.abs(currentScrollY - lastScrollY)

            // Only show navigation on mobile if scroll exceeds threshold
            if (window.innerWidth <= 768) {
                if (scrollDelta >= SCROLL_THRESHOLD) {
                    isVisible = true
                    lastScrollY = currentScrollY

                    // Clear existing timeout
                    if (scrollTimeout) {
                        clearTimeout(scrollTimeout)
                    }

                    // Hide after 2 seconds of no scrolling
                    scrollTimeout = window.setTimeout(() => {
                        isVisible = false
                    }, 2000)
                }
            } else {
                // On desktop, always show
                isVisible = true
            }
        }

        // Check if mobile on mount
        if (window.innerWidth <= 768) {
            isVisible = false
            lastScrollY = window.scrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
        }
    })

    function handleClick(sectionId: string) {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }
</script>

<nav class="side-navigation" class:visible={isVisible}>
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
    <a href="/posts" class="nav-item">
        <span class="dot"></span>
        <span class="label">Blog</span>
    </a>
</nav>

<style>
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

    @media (max-width: 768px) {
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
            /* box-shadow: -10px 0 20px var(--background-primary); */
        }

        .side-navigation.visible {
            opacity: 1;
            transform: translateX(0);
            pointer-events: auto;
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
        mix-blend-mode: var(--blend-mode);
    }

    .nav-item.active .label {
        color: var(--foreground-secondary);
        font-weight: 600;
        mix-blend-mode: var(--blend-mode);
    }

    @media (max-width: 768px) {
        .label {
            font-size: 0.9rem;
            color: var(--foreground-primary);
            mix-blend-mode: normal;
        }

        .nav-item .label {
            color: var(--foreground-primary);
            mix-blend-mode: normal;
        }

        .nav-item.active .label {
            color: var(--foreground-primary);
            mix-blend-mode: normal;
        }

        .side-navigation {
            gap: 1.5rem;
        }
    }
</style>
