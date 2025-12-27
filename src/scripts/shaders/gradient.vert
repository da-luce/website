attribute vec2 aVertexPosition;
varying vec2 v_texCoord;

void main() {
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    v_texCoord = aVertexPosition * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
}
