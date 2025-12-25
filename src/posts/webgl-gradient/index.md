---
title: 'Beautiful Blurred Gradients with WebGL Shaders'
description: 'WebGL without the bloat.'
author: 'Dalton Luce'
date: '2024-11-29'
hidden: 'true'
tags:
    - 'webgl'
    - 'svelte'
---

# Beautiful Blurred Gradients with WebGL Shaders

_Building a grainy, blurred gradient from scratch with WebGL shaders._

> This tutorial uses the older, more widely supported [WebGL](https://caniuse.com/webgl) over the newer [WebGL2](https://caniuse.com/webgl2).

Blurred gradients--a staple in modern UI trends. From [Stripe's homepage](https://web.archive.org/web/20241101005257/https://stripe.com/en-fi) to the background animation to the Apple Intelligence, companies and designers everywhere are using this trend. And for good reason--these gradients can be a both a flashy and subtle way to draw user's attention. Wanting to hop on the hype train, I looked in to creating my own grainy gradient for [my website](https://www.daltonluce.com/).

![A Blurred Gradient](/posts/gradient/gradient.png)

_<p style="text-align: center;">A nice blurred gradient we'll produce with WebGL (and it moves!)</p>_

<img src="https://dalton-website-artifacts.s3.us-east-2.amazonaws.com/posts/gradient/test.svg" class="svg-filter"/>

My journey to creating my dream gradient began where many UI experiments begin--I explored several approaches to achieve the dreamy, blobby gradient effect. The simplest approach seemed to be drawing on an HTML [Canvas](https://www.w3schools.com/html/html5_canvas.asp) element. The beloved canvas provides a ton of upfront tools for drawing lines, shapes, and other post processing effects. I created a proof of concept inspired by [this tutorial](https://www.youtube.com/watch?v=D6EiRSRhsbQ), but the effect wasn't exactly what I was looking for, and the performance was... well, not great. It seemed drawing directly onto the canvas was not going to be good solution for a full page gradient.

Shaders to the rescue! I started to look into [shaders](https://www.shadertoy.com/), a way to utilize the graphics processing power of computer to efficiently push pixels to the screen in parallel. This tutorial brushes over some of the more technical details. This is not intended to be an in-depth tutorial on shaders, for that, [The Book of Shaders](https://thebookofshaders.com/) is a _superb_ resource on the topic. [Learn OpenGL](https://learnopengl.com/) is also an invaluable resource on the topic. Instead, I choose to highlight the unique ideas and easier something.

There are many great libraries out there that enable the easy construction of 3D and 2D JavsScript objects, [three.js](https://threejs.org/) and [more](https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc) included. However, I wasn't too inclined to introduce a large dependency (> 500 KB in the case of three.js), for a simple 2D shader. Indeed, adding the code we need for a simple shader isn't that much, but definitely involves quite a few steps. This is why I have broken this tutorial into two parts.

1. Creating a basic 2D WebGL shader program from scratch
2. Implementing a blurred gradient

## 1. Shader Shenanigans: Painting Pixels with WebGL

Before we can play Picasso, we need a canvas to which we can draw our gradient:

```html
<!-- Define a full screen canvas -->
<canvas id="gradient_canvas"></canvas>

<style>
    #gradient_canvas {
        position: fixed;
        top: 0;
        left: 0;
        display: block;
        width: 100vw;
        height: 100vh;
    }
</style>
```

<!-- ![](phoyo!) -->

_Pretty boring so far_

Now, we hook up a WbGL instance to this. We'll start by initializing WebGL.

```ts
// Initialize WebGL
const canvas = document.getElementById('gradient_canvas')
const gl = canvas.getContext('webgl')
if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it.')
    return
}
```

To write something to the canvas, we first need a [mesh](https://bcalabs.org/subject/polygon-meshes-in-computer-graphics): a collection of vertices which will be used to define what shapes we ultimately draw our pixels to. Since we're looking to create a 2D image, we don't need anything fancy--all we need is a single rectangle that fills the entire canvas! If you're used to working with canvas's you may be used to working with units like pixels and other units proportional to the screen space. However, the vertexes are given in clip space, where the $x$, $y$, and $z$ coordinates are in the range $[-1.0, 1.0]$. Values outside this range will not be displayed. Since we are working on a 2D image, we can simplify things by only working with the $x$ and $y$ coordinates, WenGL will assume $z = 0$. Thus, we may define our rectangle with the set:

$$
(1, 1), \space (-1, 1), \space (-1, -1), \space (1, -1)
$$

Putting this into code:

```ts
// Define our coordinates
const vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(
    gl.ARRAY_BUFFER,
    // We pass out coordinates as a single array
    new Float32Array([1, 1, -1, 1, -1, -1, 1, -1]),
    gl.STATIC_DRAW
)
```

### Time to Draw

To create our shader, we need both a vertex and fragment shader. These will be combined into a WebGL "program".

#### Vertex Shader

This one is easy. The vertex shader transforms the properties of the provided vertices (position, color, etc.), which can be used for some cool things such as [height mapping](https://padrend.github.io/Tutorials/heightmap_shader). However, we already have the vertices exactly where we want them--we don't need to do anything!

All vertex shader takes a (2D, in our case) coordinate position `aVertexPosition`, and returns a "Homogeneous coordinate" `gl_Position`, containing a `x`, `y`, `z`, and `w` component. Since we want a simple, 2D [orthographic projection](https://en.wikipedia.org/wiki/Orthographic_projection), we set `z = 0` and `w = 1.0`.

```glsl
attribute vec2 aVertexPosition;
void main() {
    gl_Position = vec4(aVertexPosition, 0, 1.0);
}
```

#### Fragment Shader

This is where the magic happens. The fragment shader takes the coordinates of a fragment (i.e. pixel) `gl_FragCoord` and sets it's color `gl_FragColor`.

We'll start with something basic, setting every pixel to red.

```glsl
// Use medium floating point precision
precision mediump float;

void main() {
    // Red
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

#### Putting it all together

To use these shaders, we combine them into a _program_. WebGL takes the shader content as a string (_eww_). With the vertex and fragment shader strings defined as `vertexShaderSource` and `fragmentShaderSource` respectively, we create the program as so:

```ts
const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

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
```

Fwheeeh. That was a lot of work. Here's a red gradient

TODO: embed code?

## 2. Gradients: Shading with Style
