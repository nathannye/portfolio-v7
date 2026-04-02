import crawlMeMaybeSitemap from '@crawl-me-maybe/sitemap'
import { createClient } from '@sanity/client'
import { solidStart } from '@solidjs/start/config'
import { nitroV2Plugin as nitro } from '@solidjs/vite-plugin-nitro-2'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { DOMAIN } from './src/config'

export default defineConfig({
	plugins: [
		solidStart(),
		tailwindcss(),
		nitro(),
		crawlMeMaybeSitemap({
			domain: DOMAIN,
			sitemaps: async () => {
				const client = createClient({
					projectId: 'b53ej91c',
					dataset: 'production',
					apiVersion: '2026-01-21',
					perspective: 'published',
				})

				const projects = await client.fetch(
					'*[_type == "project"] {title, slug, _updatedAt}',
				)

				const home = await client.fetch('*[_type == "home"] {_updatedAt}')
				const homeItem = {
					url: '/',
					lastModified: home._updatedAt,
				}

				const projectItems = projects.map((project) => ({
					url: project.slug,
					lastModified: project._updatedAt,
				}))

				return [homeItem, ...projectItems]
			},
		}),
	],
})
