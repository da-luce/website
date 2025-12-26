// Idea from: https://www.shadertoy.com/view/ttlGDf

precision mediump float;

uniform sampler2D u_firstPassTexture;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_mouseEnabled;

// Parameters for warp effect
uniform float u_baseWarpStrength;
uniform float u_mouseWarpStrength;
uniform float u_effectRadius;
uniform float u_timeScale;

varying vec2 v_texCoord;

void main() {
    // Convert mouse from [-1,1] to [0,1] UV space
    vec2 mouseUV = u_mouse * 0.5 + 0.5;
    vec2 delta = v_texCoord - mouseUV;
    float dist = length(delta);

    float t = u_time * u_timeScale; // Time scaling for animation

    // Create a smooth falloff - effect is strongest near mouse, fades away
    float falloff = smoothstep(u_effectRadius, 0.0, dist);

    // Calculate final warp strength: base + conditional mouse influence
    float warpStrength = u_baseWarpStrength + u_mouseWarpStrength * falloff * u_mouseEnabled;

    // Calculate aspect ratio and apply correction
    float aspect = u_resolution.x / u_resolution.y;

    // Calculate warp pattern based on FIXED canvas coordinates (not relative to mouse)
    vec2 centered = (v_texCoord - 0.5) * 4.0; // Center around canvas center
    centered.x *= aspect; // Apply aspect ratio correction

    // Apply iterative sin/cos warping to create flowing patterns
    // This pattern is FIXED to the canvas and doesn't move with the mouse
    for(float k = 1.0; k < 7.0; k += 1.0) {

        // Slow phase shifts for less repetitive patterns
        float slowPhaseX = sin(t * 0.1 + k);
        float slowPhaseY = cos(t * 0.07 + k * 1.3);

        centered.x += warpStrength * sin(2.0 * t + k * 1.5 * centered.y + slowPhaseX);
        centered.y += warpStrength * cos(2.0 * t + k * 1.5 * centered.x + slowPhaseY);
    }

    // Convert back to texture coordinates (undo aspect correction)
    centered.x /= aspect;
    vec2 warpedPos = 0.5 + centered / 4.0;

    // Sample the warped texture
    vec4 color = texture2D(u_firstPassTexture, warpedPos);

    gl_FragColor = color;
}