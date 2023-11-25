<script lang="ts">
    let color:string;
    let opacity:number;
    let href:string;
    let text:string;
    
    /*
     * TODO: find away around inline styling to achieve hover effect?
    */
    const [hover, setHover] = useState(false);

    const addAlpha = (color: string, opacity: number) => {
        // coerce values so ti is between 0 and 1.
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }

    const linkStyle = {
        borderWidth: '0.1rem',
        borderStyle: 'solid',
        borderRadius: '0.75rem',
        padding: '0.4rem',
        transitionDuration: '250ms',
        color: hover ? 'black' : '#c6c8d1',
        backgroundColor: hover ? color : 'transparent',
        borderColor: hover ? color : '#c6c8d1',
    }

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

</script>

&nbsp;<a href={href} target="_blank" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <span>{text}</span>
</a>