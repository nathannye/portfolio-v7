import { definePlugin } from 'sanity'
import SeoLayoutWrapper from './src/components/core/SeoLayoutWrapper'
import entities from './src/schemas/entities'
import fieldGroups from './src/schemas/fields'
import global from './src/schemas/global'
import singleton from './src/schemas/singleton'

export default definePlugin({
	name: 'crawl-me-maybe',

	schema: {
		types: [...fieldGroups, ...global, ...entities, ...singleton],
	},
	studio: {
		components: {
			layout: SeoLayoutWrapper,
		},
	},
})

// Export types for use in other parts of the codebase
export type { SchemaMarkupType } from './src/types'
