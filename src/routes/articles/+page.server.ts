// src/routes/articles/+page.server.ts
import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';

// NOTE: need to prerender this in order for article slugs to also prerender
export const prerender = true;

export const load: PageServerLoad = async () => {
  const articlesPath = path.resolve('src/articles');

  const articles = fs.readdirSync(articlesPath).filter((dir) => {
    const dirPath = path.join(articlesPath, dir);
    return fs.statSync(dirPath).isDirectory();
  });

  return { articles };
};
