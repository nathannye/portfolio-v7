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
		nitro({
			prerender: {
				crawlLinks: true,
			},
			preset: 'vercel',
			routeRules: {
				'/**': {
					prerender: true,
				},
				'/projects/**': {
					prerender: true,
				},
				'/margins/**': {
					prerender: true,
				},
			},
		}),
		crawlMeMaybeSitemap({
			domain: DOMAIN,
			sitemaps: async () => {
				const client = createClient({
					projectId: 'b53ej91c',
					dataset: 'production',
					apiVersion: '2026-01-21',
					useCdn: false,
					perspective: 'published',
				})

				const projects = await client.fetch(
					'*[_type == "project"] {slug, _updatedAt}',
				)

				const home = await client.fetch('*[_type == "home"]{_updatedAt}')
				const homeItem = {
					url: `${DOMAIN}/`,
					lastModified: home._updatedAt,
				}

				const projectItems = projects.map(
					(project: { slug: string; _updatedAt: string }) => ({
						url: `${DOMAIN}/${project.slug}`,
						lastModified: project._updatedAt,
					}),
				)

				return [homeItem, ...projectItems]
			},
		}),
	],
})
