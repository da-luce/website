import adapter from '@sveltejs/adapter-static'
import { config as dotenvConfig } from 'dotenv'
import path from 'path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// Load environment variables
dotenvConfig()

// Check if we're in development mode
const dev = process.argv.includes('dev')

// Build S3 URL from environment variables
const S3_BUCKET = process.env.S3_BUCKET || 'dalton-website-artifacts'
const S3_REGION = process.env.S3_REGION || 'us-east-2'
const assetsUrl = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter(),
        alias: {
            $scripts: path.resolve('./src/scripts'),
            $types: path.resolve('./src/types'),
        },

        paths: {
            // Dev: serve from local static/ folder
            // Prod: serve from S3 bucket (URL built from .env variables)
            assets: dev ? '' : assetsUrl
        },
        prerender: {
            handleHttpError: 'ignore'
        }
    },
}

export default config
