import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import fs from 'fs'
import hljs from 'highlight.js'
import markdownit from 'markdown-it'
import markdownitKatex from 'markdown-it-katex'
import matter from 'gray-matter'
import path from 'path'

export const prerender = true

// Define a named highlight function
const highlightCode = (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(str, { language: lang }).value
        } catch {
            return ''
        }
    }
    return ''
}

const md = markdownit({
    html: true, // HTML rendering
    highlight: highlightCode, // Code syntax highlighting
}).use(markdownitKatex) // KaTeX support

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug
    const articlePath = path.resolve('src/articles', slug, 'index.md')

    try {
        // Read the markdown file content
        const articleContent = fs.readFileSync(articlePath, 'utf-8')

        // Extract front matter
        const { content, data } = matter(articleContent)

        // Convert markdown to HTML using markdown-it with syntax highlighting
        const htmlContent = md.render(content)

        // Return the title and content
        return {
            title: slug.replace(/-/g, ' ').toUpperCase(),
            content: htmlContent,
        }
    } catch (err) {
        console.error('Error loading article:', err)
        throw error(404, 'Article not found')
    }
}
