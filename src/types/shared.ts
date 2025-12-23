// src/types/shared.ts
export interface Post {
    title: string
    description: string
    date: string
    slug: string
    hidden: boolean
}

export interface TimelineItem {
    title: string
    image: string  // Path to image/svg file
    date: string
    description: string
    imageSize?: string  // Optional size (e.g., '3rem', '4rem'), defaults to '3rem'
    imageStyle?: string  // Optional CSS style (e.g., 'border-radius: 50%;' for circular)
    showDot?: boolean  // Optional, show timeline dot (defaults to true)
    dotColor?: string  // Optional, color of the timeline dot
}
