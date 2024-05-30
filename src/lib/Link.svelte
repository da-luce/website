<script lang="ts">
    export let color: string = "#b6e4fc"; // Default color
    export let href: string;
    export let text: string;

    let opacity: number;

    let hover = false;

    const addAlpha = (color: string, opacity: number): string => {
        // Coerce values so it is between 0 and 1.
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    };

    // Reactive statement to update styles based on state
    $: linkStyle = {
        borderWidth: "0.1rem",
        borderStyle: "solid",
        borderRadius: "0.75rem",
        padding: "0.4rem",
        transitionDuration: "250ms",
        color: hover ? "#030c1d" : "#c6c8d1", // Static color
        backgroundColor: hover ? addAlpha(color, opacity) : "transparent",
        borderColor: "#c6c8d1", // Static color
    };
</script>

<a
    {href}
    target="_blank"
    class:hover
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
    style={`
       border-width: ${linkStyle.borderWidth};
       border-style: ${linkStyle.borderStyle};
       border-radius: ${linkStyle.borderRadius};
       padding: ${linkStyle.padding}; /* Consider reducing padding here */
       transition-duration: ${linkStyle.transitionDuration};
       color: ${linkStyle.color};
       background-color: ${linkStyle.backgroundColor};
       border-color: ${linkStyle.borderColor};
    `}
>
    <span>{text}</span>
</a>

<style>
    a {
        text-decoration: none;
        display: inline-flex; /* Changed to inline-flex to control height better */
        align-items: center; /* This will vertically center the text inside the anchor */
        justify-content: center; /* Horizontally center content */
        line-height: 1; /* Reducing line height can reduce the height taken by text */
        margin: 0; /* Ensure no margin is adding extra space */
        pointer-events: auto; /* Passes through the mouse events */
        /* Other styles */
    }

    span {
        display: block;
        /* If the text is still taking too much vertical space, you could adjust the font-size or line-height here */
    }
</style>
