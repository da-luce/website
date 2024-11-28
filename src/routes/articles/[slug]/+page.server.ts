import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import fs from 'fs';
import { marked } from 'marked';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
  // Extract the slug from the URL
  const slug = params.slug;

  // Define the path to the markdown file (adjust if you have a different directory structure)
  const articlePath = path.resolve('src/articles', slug, 'index.md');

  try {
    // Read the markdown file content
    const articleContent = fs.readFileSync(articlePath, 'utf-8');

    // Convert markdown to HTML using `marked`
    const htmlContent = marked(articleContent);

    // Return the title (you can format it based on the slug) and content
    return {
      title: slug.replace(/-/g, ' ').toUpperCase(),  // You can adjust this logic for the title

      content: htmlContent
    };
  } catch (err) {
    console.error('Error loading article:', err);
    // Return a 404 error if the article is not found
    throw error(404, 'Article not found');
  }
};
