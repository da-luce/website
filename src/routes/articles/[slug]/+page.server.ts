import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import fs from 'fs';
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import markdownitKatex from 'markdown-it-katex';
import path from 'path';

// Create an instance of markdown-it with custom highlight function
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // Use default escaping if no highlighting is available
  }
}).use(markdownitKatex);

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug;
  const articlePath = path.resolve('src/articles', slug, 'index.md');

  try {
    // Read the markdown file content
    const articleContent = fs.readFileSync(articlePath, 'utf-8');

    // Convert markdown to HTML using markdown-it with syntax highlighting
    const htmlContent = md.render(articleContent);

    // Return the title and content
    return {
      title: slug.replace(/-/g, ' ').toUpperCase(),
      content: htmlContent
    };
  } catch (err) {
    console.error('Error loading article:', err);
    throw error(404, 'Article not found');
  }
};
