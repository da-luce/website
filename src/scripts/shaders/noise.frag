// Idea from https://www.shadertoy.com/view/Mt3czf

precision mediump float;
uniform sampler2D u_firstPassTexture;
varying vec2 v_texCoord;
uniform float u_strength;
uniform float u_frequency;

    // Function to create noise effect
float noise(vec2 coord) {
    return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
        // Apply the noise effect to offset texture coordinates
    float n = noise(v_texCoord * u_frequency); // Adjust the multiplier to control the noise frequency
    vec2 scatter = vec2(noise(v_texCoord + n), noise(v_texCoord - n)) * u_strength; // Offset magnitude

        // Offset the texture coordinates
    vec2 scatteredCoord = v_texCoord + scatter;

        // Sample the texture at the scattered coordinates
    vec4 scatteredColor = texture2D(u_firstPassTexture, scatteredCoord);

        // Output the final color
    gl_FragColor = scatteredColor;
}