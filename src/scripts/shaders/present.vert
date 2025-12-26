attribute vec4 aVertexPosition;
varying vec2 v_texCoord;

void main() {
    gl_Position = aVertexPosition;
    v_texCoord = aVertexPosition.xy * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
}
