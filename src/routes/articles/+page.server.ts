import type { Article } from '$types/shared'
// src/routes/articles/+page.server.ts
import type { PageServerLoad } from './$types'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// Prerender this page to generate static HTML for all articles
export const prerender = true

export const load: PageServerLoad = async () => {
    const articlesPath = path.resolve('src/articles')

    // Read the directories in the articles folder
    const articleDirs = fs.readdirSync(articlesPath).filter((dir) => {
        const dirPath = path.join(articlesPath, dir)
        return fs.statSync(dirPath).isDirectory()
    })

    // Get the metadata for each article
    const articles: Article[] = articleDirs.map((dir) => {
        const filePath = path.join(articlesPath, dir, 'index.md') // Assuming markdown file is named index.md

        // Read the markdown file and parse frontmatter
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(fileContent)

        // Return the article metadata along with the slug (dir name)
        return {
            slug: dir,
            title: data.title || 'Untitled',
            description: data.description || 'No description',
            date: data.date || 'Unknown Date',
        }
    })

    // Return the articles for rendering in the front end
    return {
        articles,
    }
}
