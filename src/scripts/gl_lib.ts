function loadShader(
    gl: WebGLRenderingContext,
    type:
        | WebGLRenderingContextBase['VERTEX_SHADER']
        | WebGLRenderingContextBase['FRAGMENT_SHADER'],
    source: string
) {
    const shader = gl.createShader(type)
    if (!shader) {
        alert('Cannot create shader.')
        throw new Error('WebGL internal error')
    }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            'An error occurred compiling the shaders: ' +
            gl.getShaderInfoLog(shader)
        )
        gl.deleteShader(shader)
        return null
    }

    return shader
}

export function createShaderProgram(
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
) {
    // Create shaders from source
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = loadShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    )
    if (!fragmentShader || !vertexShader) {
        alert('Cannot create shader program.')
        throw new Error('WebGL internal error')
    }

    // Create shader program
    const shaderProgram = gl.createProgram()
    if (!shaderProgram) {
        alert('Cannot create shader program.')
        throw new Error('WebGL internal error')
    }

    // Attach and link shaders
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(
            'Unable to link the shader program:',
            gl.getProgramInfoLog(shaderProgram)
        )
        // Handle the error, e.g., by returning or throwing an error
    }
    return shaderProgram
}


export class GLRenderTarget {
    gl: WebGLRenderingContext;
    framebuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    width: number;
    height: number;

    constructor(gl: WebGLRenderingContext, width: number, height: number) {
        this.gl = gl;
        this.width = width;
        this.height = height;

        this.framebuffer = gl.createFramebuffer()!;
        this.texture = gl.createTexture()!;

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            width,
            height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        );

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            this.texture,
            0
        );

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            throw new Error("Framebuffer incomplete");
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    bind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
        this.gl.viewport(0, 0, this.width, this.height);
    }

    unbind() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    resize(width: number, height: number) {
        if (width === this.width && height === this.height) return;

        this.width = width;
        this.height = height;

        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            width,
            height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        );
    }
}

// Pass object
// It takes a shader program and associated uniforms. It has a render method to draw using the shader.
// It assumes a full-screen quad is already set up in the GL context.
export class GLPostPass {
    gl: WebGLRenderingContext
    program: WebGLProgram
    private vertexBuffer: WebGLBuffer
    private positionLocation: number

    private uniformSetters: { [name: string]: (value: any) => void } = {}

    constructor(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
    ) {
        this.gl = gl
        this.program = program

        // Create vertex buffer for fullscreen quad
        this.vertexBuffer = gl.createBuffer()!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        )

        // Get attribute location
        this.positionLocation = gl.getAttribLocation(program, 'aVertexPosition')

        this.reflectUniforms()
    }

    // Getter to check if a uniform exists
    hasUniform(name: string): boolean {
        return this.uniformSetters.hasOwnProperty(name);
    }

    render(output?: GLRenderTarget | null) {
        const gl = this.gl;

        if (output) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, output.framebuffer);
            gl.viewport(0, 0, output.width, output.height);
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program);

        // Bind and set up vertex buffer (only if attribute exists)
        if (this.positionLocation >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.enableVertexAttribArray(this.positionLocation);
            gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setUniform(name: string, value: any) {
        const setter = this.uniformSetters[name];

        if (setter) {
            // FIXME: do I need to bind the program here again?
            this.gl.useProgram(this.program);
            setter(value);
        } else {
            console.warn(`Uniform ${name} not found in shader program.`);
        }
    }

    private reflectUniforms() {

        const gl = this.gl;
        const program = this.program;

        const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        let textureUnit = 0;

        for (let i = 0; i < count; i++) {
            const info = gl.getActiveUniform(program, i);
            if (!info) continue;

            const name = info.name.replace(/\[0\]$/, "");
            const loc = gl.getUniformLocation(program, name);
            if (!loc) continue;

            this.uniformSetters[name] = GLPostPass.createUniformSetter(
                gl,
                loc,
                info,
                () => textureUnit++
            );
        }
    }

    // Creates a setter function for a given uniform based on its type
    // This allows us to avoid checking types and uniform locations every frame
    private static createUniformSetter(
        gl: WebGLRenderingContext,
        loc: WebGLUniformLocation,
        info: WebGLActiveInfo,
        nextTextureUnit: () => number
    ) {
        switch (info.type) {
            case gl.FLOAT:
                if (info.size > 1) {
                    // Array of floats
                    return (v: Float32Array | number[]) => gl.uniform1fv(loc, v);
                } else {
                    // Single float
                    return (v: number) => gl.uniform1f(loc, v);
                }

            case gl.FLOAT_VEC2:
                return (v: Float32Array | number[]) => gl.uniform2fv(loc, v);

            case gl.FLOAT_VEC3:
                return (v: Float32Array | number[]) => gl.uniform3fv(loc, v);

            case gl.FLOAT_VEC4:
                return (v: Float32Array | number[]) => gl.uniform4fv(loc, v);

            case gl.FLOAT_MAT4:
                return (v: Float32Array) =>
                    gl.uniformMatrix4fv(loc, false, v);

            case gl.SAMPLER_2D:
                const unit = nextTextureUnit();
                return (tex: WebGLTexture) => {
                    gl.activeTexture(gl.TEXTURE0 + unit);
                    gl.bindTexture(gl.TEXTURE_2D, tex);
                    gl.uniform1i(loc, unit);
                };

            case gl.BOOL:
                return (v: boolean) => gl.uniform1i(loc, v ? 1 : 0);

            case gl.INT:
                if (info.size > 1) {
                    // Array of ints
                    return (v: Int32Array | number[]) => gl.uniform1iv(loc, v);
                } else {
                    // Single int
                    return (v: number) => gl.uniform1i(loc, v);
                }

            case gl.INT_VEC2:
                return (v: Int32Array | number[]) => gl.uniform2iv(loc, v);

            case gl.INT_VEC3:
                return (v: Int32Array | number[]) => gl.uniform3iv(loc, v);

            case gl.INT_VEC4:
                return (v: Int32Array | number[]) => gl.uniform4iv(loc, v);

            default:
                console.warn("Unsupported uniform type", info.type);
                return () => { };
        }
    }
}

export class GLPostPipeline {
    gl: WebGLRenderingContext;
    passes: GLPostPass[] = [];
    targets: GLRenderTarget[] = [];
    inputTextureUniform: string;

    constructor(gl: WebGLRenderingContext, inputTextureUniform: string = "u_firstPassTexture") {
        this.gl = gl;
        this.inputTextureUniform = inputTextureUniform;
    }

    addPass(pass: GLPostPass, width: number, height: number) {
        this.passes.push(pass);

        // Create a render target for each pass except the last (which will render to screen)
        const target = new GLRenderTarget(this.gl, width, height);
        this.targets.push(target);
    }

    resize(width: number, height: number) {
        for (const target of this.targets) {
            target.resize(width, height);
        }
    }

    render() {
        const numPasses = this.passes.length;

        for (let i = 0; i < numPasses; i++) {
            const pass = this.passes[i];
            const target = i < numPasses - 1 ? this.targets[i] : null; // Last pass goes to screen

            // If not the first pass, bind previous pass's output as input
            if (i > 0 && pass.hasUniform(this.inputTextureUniform)) {
                const prevTarget = this.targets[i - 1];
                pass.setUniform(this.inputTextureUniform, prevTarget.texture);
            }

            pass.render(target ?? null);
        }
    }
}
