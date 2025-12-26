<script>
    export let src // SVG file path
    export let size = '3rem' // optional size
    export let color = 'currentColor' // default to current text color

    import { onMount } from 'svelte'
    let svgContent = ''

    // Fetch the SVG file and store its content
    onMount(async () => {
        if (!src) return
        const res = await fetch(src)
        let content = await res.text()

        // Remove hardcoded width, height attributes and inline style attributes
        content = content.replace(/width="[^"]*"/g, '')
        content = content.replace(/height="[^"]*"/g, '')
        content = content.replace(/style="[^"]*"/g, '')

        // Remove <style> tags and their contents
        content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')

        // Remove class attributes (which reference style definitions)
        content = content.replace(/class="[^"]*"/g, '')

        // Replace existing fill and stroke attributes with currentColor
        content = content.replace(/fill="[^"]*"/g, 'fill="currentColor"')
        content = content.replace(/stroke="[^"]*"/g, 'stroke="currentColor"')

        // Add fill="currentColor" to path elements that don't have fill attribute
        content = content.replace(
            /<path(?![^>]*fill=)/g,
            '<path fill="currentColor"'
        )
        content = content.replace(
            /<circle(?![^>]*fill=)/g,
            '<circle fill="currentColor"'
        )
        content = content.replace(
            /<rect(?![^>]*fill=)/g,
            '<rect fill="currentColor"'
        )
        content = content.replace(
            /<polygon(?![^>]*fill=)/g,
            '<polygon fill="currentColor"'
        )
        content = content.replace(
            /<ellipse(?![^>]*fill=)/g,
            '<ellipse fill="currentColor"'
        )

        svgContent = content
    })
</script>

<!-- Render the SVG inline -->
<div class="svg-wrapper" style="width:{size}; height:{size}; color:{color}">
    {@html svgContent}
</div>

<style>
    .svg-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .svg-wrapper svg {
        width: auto;
        height: 100%;
        max-width: 100%;
        fill: currentColor; /* uses the `color` prop */
        stroke: currentColor; /* optional for outlines */
    }
</style>
