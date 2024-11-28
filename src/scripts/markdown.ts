// src/routes/[slug].ts

import fs from 'fs';
import { marked } from 'marked';
import matter from 'gray-matter';
import path from 'path';

const articlesDir = path.resolve('src/articles');  // Adjust the folder path if needed

export async function load({ params }) {
  const { slug } = params;

  // Only run the file system code on the server
  if (import.meta.env.SSR) {
    const articlePath = path.resolve(articlesDir, slug, 'index.md');
    const fileContents = fs.readFileSync(articlePath, 'utf-8');
    const { content, data } = matter(fileContents); // Parse frontmatter and content
    const htmlContent = marked(content); // Convert markdown to HTML

    return {
      props: {
        htmlContent,
        metadata: data,
      }
    };
  }

  return {
    props: {
      htmlContent: '',
      metadata: {},
    }
  };
}
