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

// Open links in a new tab

var defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
    }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // Add a new `target` attribute, or replace the value of the existing one.
    tokens[idx].attrSet('target', '_blank')

    // Pass the token to the default renderer.
    return defaultRender(tokens, idx, options, env, self)
}

// Replace "--" with em dash

md.core.ruler.push('replace_dashes', function (state) {
    state.tokens.forEach(function (token) {
        if (token.type === 'inline' && token.children) {
            token.children.forEach(function (child) {
                if (child.type === 'text') {
                    // Replace `--` with `—` in the text content
                    child.content = child.content.replace(/--/g, '—')
                }
            })
        }
    })
})

const removeTitle = (input: string): string => {
    let titleRemoved = false
    return input
        .split('\n') // Split the input into lines
        .filter((line) => {
            if (!titleRemoved && line.startsWith('# ')) {
                titleRemoved = true // Skip the first occurrence
                return false
            }
            return true // Keep all other lines
        })
        .join('\n') // Join the remaining lines back together
}

const calculateReadTime = (text: string): number => {
    const words = text.split(/\s+/).filter((word) => word.length > 0).length
    const readingSpeed = 200 // Average words per minute
    return Math.ceil(words / readingSpeed)
}

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug
    const postPath = path.resolve('src/posts', slug, 'index.md')

    try {
        // Read the markdown file content
        const postContent = fs.readFileSync(postPath, 'utf-8')

        // Extract front matter
        const { content, data } = matter(postContent)

        // Strip the first-level heading (title) from the content
        const strippedContent = removeTitle(content)

        // Convert markdown to HTML using markdown-it with syntax highlighting
        const htmlContent = md.render(strippedContent)

        const readTime = calculateReadTime(strippedContent)

        // Return the title and content
        return {
            title: data.title || slug.replace(/-/g, ' ').toUpperCase(),
            content: htmlContent,
            author: data.author || 'Unknown Author',
            date: data.date || 'Unknown Date',
            readTime: readTime,
        }
    } catch (err) {
        console.error('Error loading post:', err)
        throw error(404, 'post not found')
    }
}
