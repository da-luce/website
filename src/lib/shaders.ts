export const vsSource = `
      attribute vec2 aVertexPosition;
      void main() {
          gl_Position = vec4(aVertexPosition, 0, 1.0);
      }
  `;

/* Dynamically take number of points. If we buffer an array with more
space than the number of points, we get a dark spot in the middle of zeroed points */
export const fsSource = (numPoints: number) => `
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
          float p = 1.0;

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
  `;
