<script lang="ts">
    let container: HTMLDivElement;
    let scale = 5;
    let animationFrameId: number;

    function handleMouseMove(event: MouseEvent) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            const rotateX = (deltaY / centerY) * scale;
            const rotateY = (deltaX / centerX) * -scale;

            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    }

    function handleMouseLeave() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        container.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1.0)";
    }
</script>

<div
    bind:this={container}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    role="presentation"
>
    <slot></slot>
</div>

<style>
    div {
        perspective: 1000px;
        transition: transform 0.2s ease;
        background-color: transparent;
        border-color: transparent;
        will-change: transform;
    }
</style>
