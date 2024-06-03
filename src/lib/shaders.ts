export const vsSource = `
      attribute vec2 aVertexPosition;
      void main() {
          gl_Position = vec4(aVertexPosition, 0, 1.0);
      }
  `;

export const fsSource = `
      #define MAX_POINTS 16

      precision mediump float;

      uniform vec2 u_points[MAX_POINTS];

      uniform float u_reds[MAX_POINTS];
      uniform float u_greens[MAX_POINTS];
      uniform float u_blues[MAX_POINTS];

      uniform vec2 u_resolution;

      float w_i (in vec2 x, in vec2 x_i, in float p) {

          // Weird distance normalization
          vec2 displacement = x - x_i;
          float distance = length(displacement);

          return pow(distance, -p);
      }

      float u (in vec2 x, in float p, in float vals[MAX_POINTS]) {

          float weight_sum = 0.0;
          float value_sum = 0.0;

          float aspect_ratio = u_resolution.x / u_resolution.y;

          for (int i = 0; i < MAX_POINTS; ++i) {

              // Normalize point coordinates to aspect ratio
              // x is already normalized when passed in
              vec2 point_i_norm = vec2(u_points[i].x * aspect_ratio, u_points[i].y);
              weight_sum += w_i (x, point_i_norm, p) * vals[i]; // Subtract a constant value from this to achieve the "ball effect"
              value_sum += w_i (x, point_i_norm, p);
          }
          return weight_sum > 0.0 ? weight_sum / value_sum: 0.0; // Avoid division by zero
      }

      void main() {
          float p = 5.0;

          // Convert fragment coordinates to normalized device coordinates
          vec2 ndc_frag = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;

          // Adjust normalized coordinates to maintain the aspect ratio
          float aspect_ratio = u_resolution.x / u_resolution.y;
          vec2 aspect_frac = vec2(ndc_frag.x * aspect_ratio, ndc_frag.y);

          float r = u(aspect_frac, p, u_reds);
          float g = u(aspect_frac, p, u_greens);
          float b = u(aspect_frac, p, u_blues);

          vec3 color = vec3(r, g, b);
          gl_FragColor = vec4(color, 1.0);
      }
  `;
