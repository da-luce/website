<script lang="ts">
    import Pill from '$lib/Pill.svelte'

    // Skills arrays based on your experience
    const topRowSkills = [
        'AWS',
        'Kafka',
        'Docker',
        'Terraform',
        'S3',
        'DynamoDB',
        'CloudFront',
        'Lambda',
        'Kubernetes',
    ]

    const bottomRowSkills = [
        'C',
        'C++',
        'Java',
        'React',
        'Svelte',
        'Node.js',
        'TypeScript',
        'Python',
        'Go',
        'Rust',
    ]
    // Duplicate arrays for seamless infinite scroll
    const topRowDuplicated = [...topRowSkills, ...topRowSkills, ...topRowSkills]
    const bottomRowDuplicated = [
        ...bottomRowSkills,
        ...bottomRowSkills,
        ...bottomRowSkills,
    ]
</script>

<div class="skills-scroll-container">
    <div class="scroll-row scroll-left">
        {#each topRowDuplicated as skill}
            <Pill text={skill} interactive={false} />
        {/each}
    </div>
    <div class="scroll-row scroll-right">
        {#each bottomRowDuplicated as skill}
            <Pill text={skill} interactive={false} />
        {/each}
    </div>
</div>

<style>
    .skills-scroll-container {
        position: relative;
        width: 100%;
        max-width: 50em;
        margin: 3rem auto;
        overflow: hidden;
        padding: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        opacity: 1;
        color: var(--foreground-secondary);
        mix-blend-mode: var(--blend-mode);
        pointer-events: auto; /* Enable pointer events for hover */

        /* Fade effect on left and right edges */
        mask-image: linear-gradient(
            to right,
            transparent 0%,
            var(--background-primary) 10%,
            var(--background-primary) 90%,
            transparent 100%
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            var(--background-primary) 10%,
            var(--background-primary) 90%,
            transparent 100%
        );
    }

    .scroll-row {
        display: flex;
        gap: 1.5rem;
        white-space: nowrap;
        will-change: transform;
    }

    .scroll-left {
        animation: scrollLeft 30s linear infinite;
    }

    .scroll-right {
        animation: scrollRight 30s linear infinite;
    }

    /* Pause animation on hover */
    .scroll-row:hover {
        animation-play-state: paused;
    }

    @keyframes scrollLeft {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-33.333%);
        }
    }

    @keyframes scrollRight {
        0% {
            transform: translateX(-33.333%);
        }
        100% {
            transform: translateX(0);
        }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .skills-scroll-container {
            padding: 1.5rem 0;
            gap: 0.75rem;
        }

        .scroll-row {
            gap: 1rem;
        }

        .scroll-left {
            animation: scrollLeft 40s linear infinite;
        }

        .scroll-right {
            animation: scrollRight 40s linear infinite;
        }
    }
</style>
