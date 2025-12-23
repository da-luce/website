export const vsGradient = `
      attribute vec2 aVertexPosition;
      void main() {
          gl_Position = vec4(aVertexPosition, 0, 1.0);
      }
  `

/* Dynamically take number of points. If we buffer an array with more
space than the number of points, we get a dark spot in the middle of zeroed points */
export const fsGradient = (numPoints: number) => `
    #define NUM_POINTS ${numPoints}

    precision mediump float;

    uniform vec2 u_points[NUM_POINTS];
    uniform vec2 u_mouse;

    uniform float u_reds[NUM_POINTS];
    uniform float u_greens[NUM_POINTS];
    uniform float u_blues[NUM_POINTS];
    uniform float u_alphas[NUM_POINTS];

    uniform vec2 u_resolution;

    // Simple radial falloff
    float falloff(float dist, float radius) {
        return exp(- (dist * dist) / (radius * radius));
    }

    void main() {
        // Map pixel to [-1,1] with aspect correction
        vec2 ndc = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 aspect_frag = vec2(ndc.x * aspect, ndc.y);

        // Parameters must be declared before the loop
        float radius = 0.5; // how wide the blobs spread
        float pointStrength = 1.0; // overall multiplier

        vec3 color = vec3(0.0);
        float alpha = 0.0;

        for (int i = 0; i < NUM_POINTS; ++i) {
            vec2 p = u_points[i] * 2.0 - 1.0;
            p.x *= aspect; // correct for aspect ratio
            float d = length(aspect_frag - p);

            float influence = falloff(d, radius) * pointStrength;

            vec3 pointColor = vec3(u_reds[i], u_greens[i], u_blues[i]);
            float pointAlpha = u_alphas[i] * influence;

            // Standard "over" blending
            color = color * (1.0 - pointAlpha) + pointColor * pointAlpha;
            alpha = alpha + pointAlpha * (1.0 - alpha); // cumulative alpha
        }

        gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
    }
`


export const vsNoise = `
    attribute vec4 aVertexPosition;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = aVertexPosition;
        v_texCoord = aVertexPosition.xy * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
    }`

export const fsNoise = `
    precision mediump float;
    uniform sampler2D u_firstPassTexture;
    varying vec2 v_texCoord;

    // Function to create noise effect
    float noise(vec2 coord) {
        return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        // Apply the noise effect to offset texture coordinates
        float n = noise(v_texCoord * 10.0); // Adjust the multiplier to control the noise frequency
        vec2 scatter = vec2(noise(v_texCoord + n), noise(v_texCoord - n)) * 0.1; // Offset magnitude

        // Offset the texture coordinates
        vec2 scatteredCoord = v_texCoord + scatter;

        // Sample the texture at the scattered coordinates
        vec4 scatteredColor = texture2D(u_firstPassTexture, scatteredCoord);

        // Output the final color
        gl_FragColor = scatteredColor;
    }`

export const vsWarp = `
    attribute vec4 aVertexPosition;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = aVertexPosition;
        v_texCoord = aVertexPosition.xy * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
    }`

export const fsWarp = `
precision mediump float;

uniform sampler2D u_firstPassTexture;
uniform vec2 u_mouse;

varying vec2 v_texCoord;

void main() {
    vec2 mouseUV = u_mouse * 0.5 + 0.5;
    vec2 delta = v_texCoord - mouseUV;
    float dist = length(delta);

    float radius = 0.15;
    float strength = 0.5;
    float falloff = smoothstep(radius, 0.0, dist);

    vec2 dir = delta / (dist + 1e-5);
    
    // Sample previous frame and accumulate
    vec4 previous = texture2D(u_firstPassTexture, v_texCoord);
    vec2 warpedCoord = v_texCoord + dir * strength * falloff;

    vec4 newColor = texture2D(u_firstPassTexture, warpedCoord);

    // Blend the new warp with the previous frame
    gl_FragColor = mix(previous, newColor, 0.8); // adjust 0.0–1.0 for persistence
}
`

export const fsPresent = `
    precision mediump float;

    uniform sampler2D u_texture;
    varying vec2 v_texCoord;

    void main() {
        gl_FragColor = texture2D(u_texture, v_texCoord);
    }
`

export const vsPresent = `
    attribute vec4 aVertexPosition;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = aVertexPosition;
        v_texCoord = aVertexPosition.xy * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
    }`
