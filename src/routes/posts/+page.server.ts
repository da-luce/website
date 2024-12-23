// src/routes/posts/+page.server.ts
import type { PageServerLoad } from './$types'
import type { Post } from '$types/shared'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// Prerender this page to generate static HTML for all posts
export const prerender = true

export const load: PageServerLoad = async () => {
    const postsPath = path.resolve('src/posts')

    // Read the directories in the posts folder
    const postDirs = fs.readdirSync(postsPath).filter((dir) => {
        const dirPath = path.join(postsPath, dir)
        return fs.statSync(dirPath).isDirectory()
    })

    // Get the metadata for each post
    const posts: Post[] = postDirs.map((dir) => {
        const filePath = path.join(postsPath, dir, 'index.md') // Assuming markdown file is named index.md

        // Read the markdown file and parse frontmatter
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(fileContent)

        // Return the post metadata along with the slug (dir name)
        return {
            slug: dir,
            title: data.title || 'Untitled',
            description: data.description || 'No description',
            date: data.date || 'Unknown Date',
            hidden: data.hidden || false,
        }
    })

    // Filter out hidden posts
    const visiblePosts = posts.filter((post) => !post.hidden)

    // Sort posts by date (latest first)
    visiblePosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()

        return dateB - dateA // Sorting descending (latest first)
    })

    // Return the posts for rendering in the front end
    return {
        visiblePosts,
    }
}
