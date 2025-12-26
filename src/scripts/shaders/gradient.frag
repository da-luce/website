#define MAX_POINTS 16

precision mediump float;

uniform vec2 u_points[MAX_POINTS];
uniform int u_numPoints;

uniform float u_reds[MAX_POINTS];
uniform float u_greens[MAX_POINTS];
uniform float u_blues[MAX_POINTS];
uniform float u_alphas[MAX_POINTS];

uniform vec2 u_resolution;

// Simple radial falloff
float falloff(float dist, float radius) {
    return exp(-(dist * dist) / (radius * radius));
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

    for(int i = 0; i < MAX_POINTS; ++i) {

        if(i >= u_numPoints) {
            break;
        }

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