# Beautiful Webgl Gradients

## Introduction

I have always loved websites with colorful, silky gradients. How is this effect
achieved? I wanted to make my own! The simplest approach I could muster was
blending different colored shapes using css. This obtained a decent looking
result most of the time, but was not performant and did not render simialrly
between different browsers. I needed a new approach... in comes webgl!

## WebGl

Webgl can appear intimidating. Examples

## Points

Our gradient will be acheived by having different points of color move around
on a canvas. We will interpolate each pixels color depending on its distance to
each point. First, the easy part. We initialize a set of points,

```ts
// Initializes and returns points with random positions and velocities
function initializePoints() {
    let points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * 2 - 1, // Between -1 and 1
            y: Math.random() * 2 - 1,
            vx: (Math.random() - 0.5) * 0.02, // Random velocity
            vy: (Math.random() - 0.5) * 0.02,
        });
    }
    return points;
}
```

Note that we are working in ____coordinates___, so the entire space the points
live in is bounded by (-1, 1) for both the x and y coordinates.

Next, we write a function to update the poisition of each point depending on its
velocity each frame (not forgetting to check for boundary coloisions).

```ts
// Update the positions of the points and handle boundary collisions
function updatePoints() {
    points = points.map((point) => {
        let newX = point.x + point.vx;
        let newY = point.y + point.vy;

        // Reverse the velocity if the point hits the boundary
        if (newX <= -1 || newX >= 1) point.vx *= -1;
        if (newY <= -1 || newY >= 1) point.vy *= -1;

        // Update position considering potential velocity reversal
        return {
            ...point,
            x: point.x + point.vx,
            y: point.y + point.vy,
        };
    });
}
```

Fragment Shader: Calculating Pixel Colors

The real magic happens in the fragment shader, where we calculate the color of each pixel based on its distance to the nearest point. This involves passing the updated point positions to the shader and using them to adjust the color intensity.
The Fragment Shader Code

glsl

precision mediump float;
uniform vec2 u_points[${numPoints}];
uniform vec2 u_resolution;

void main() {
    float minDistance = 1.0; // Start with a large distance
    for (int i = 0; i < ${numPoints}; i++) {
        vec2 pointPos = u_points[i];
        vec2 fragCoord = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
        float dist = distance(pointPos, fragCoord);
        minDistance = min(minDistance, dist);
    }
    float colorIntensity = 1.0 - minDistance * 10.0; // Scale the intensity
    gl_FragColor = vec4(colorIntensity, colorIntensity, colorIntensity, 1.0);
}

In this shader code, each pixel's color intensity is determined by its proximity to the nearest point. By calculating the distance to each point and finding the minimum distance, we create a gradient effect radiating from each point. The multiplication by 10.0 is a scaling factor to enhance the visual contrast of the gradient.
