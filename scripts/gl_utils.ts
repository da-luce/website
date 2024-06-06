function loadShader(
    gl: WebGLRenderingContext,
    type:
        | WebGLRenderingContextBase["VERTEX_SHADER"]
        | WebGLRenderingContextBase["FRAGMENT_SHADER"],
    source: string
) {
    const shader = gl.createShader(type);
    if (!shader) {
        alert("Cannot create shader.");
        throw new Error("WebGL internall error");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            "An error occurred compiling the shaders: " +
                gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

export function createShaderProgram(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
) {
    // Create shaders from source
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = loadShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );
    if (!fragmentShader || !vertexShader) {
        alert("Cannot create shader program.");
        throw new Error("WebGL internal error");
    }

    // Create shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
        alert("Cannot create shader program.");
        throw new Error("WebGL internal error");
    }

    // Attach and link shaders
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(
            "Unable to link the shader program:",
            gl.getProgramInfoLog(shaderProgram)
        );
        // Handle the error, e.g., by returning or throwing an error
    }
    return shaderProgram;
}
