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

      uniform float u_reds[NUM_POINTS];
      uniform float u_greens[NUM_POINTS];
      uniform float u_blues[NUM_POINTS];

      uniform vec2 u_resolution;

      float w_i (in vec2 x, in vec2 x_i, in float p) {
          float distance = length(x - x_i);
          return pow(distance, -p);
      }

      float u (in vec2 x, in float p, in float vals[NUM_POINTS], inout vec2 points[NUM_POINTS]) {
          float weight_sum = 0.0;
          float value_sum = 0.0;

          for (int i = 0; i < NUM_POINTS; ++i) {
              weight_sum += w_i (x, points[i], p) * vals[i]; // Subtract a constant value from this to achieve the "ball effect"
              value_sum += w_i (x, points[i], p);
          }
          return weight_sum > 0.0 ? weight_sum / value_sum: 0.0; // Avoid division by zero
      }

      void main() {
          float p = 4.0;

          // Convert fragment coordinates to normalized device coordinates
          vec2 ndc_frag = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;

          // Adjust normalized coordinates to maintain the aspect ratio
          float aspect_ratio = u_resolution.x / u_resolution.y;
          vec2 aspect_frag = vec2(ndc_frag.x * aspect_ratio, ndc_frag.y);

          // Ensure the points are correctly scaled to the aspect ratio
          vec2 points[NUM_POINTS];
          for (int i = 0; i < NUM_POINTS; ++i) {
              points[i] = vec2(u_points[i].x * aspect_ratio, u_points[i].y);
          }

          float r = u(aspect_frag, p, u_reds, points);
          float g = u(aspect_frag, p, u_greens, points);
          float b = u(aspect_frag, p, u_blues, points);

          vec3 color = vec3(r, g, b);
          gl_FragColor = vec4(color, 1.0);
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
        vec2 scatter = vec2(noise(v_texCoord + n), noise(v_texCoord - n)) * 0.025; // Offset magnitude

        // Offset the texture coordinates
        vec2 scatteredCoord = v_texCoord + scatter;

        // Sample the texture at the scattered coordinates
        vec4 scatteredColor = texture2D(u_firstPassTexture, scatteredCoord);

        // Output the final color
        gl_FragColor = scatteredColor;
    }`
