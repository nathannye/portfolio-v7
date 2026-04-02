import { table } from '@sanity/table'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { muxInput } from 'sanity-plugin-mux-input'
import { noteField } from 'sanity-plugin-note-field'
import { structure } from './desk/structure'
import crawlMeMaybe from './plugins/seo'
import { schemaTypes } from './schemas'

const sharedConfig = [
	structureTool({
		name: 'studio',
		title: 'Studio',
		structure,
	}),
	media(),
	noteField(),
	muxInput(),
	crawlMeMaybe(),
	table(),
	visionTool(),
	// presentationTool({
	// 	previewUrl: {
	// 		initial: DOMAIN,
	// 		origin: DOMAIN,
	// 		previewMode: {
	// 			enable: "/api/preview-enable",
	// 			disable: "/api/preview-disable",
	// 		},
	// 	},
	// 	allowOrigins: ["http://localhost:*", DOMAIN],
	// 	resolve,
	// }),
]

export default defineConfig({
	projectId: 'b53ej91c',
	name: 'nye-dot-dev',
	title: 'Nye',
	dataset: 'production',
	plugins: [...sharedConfig],
	schema: {
		types: schemaTypes,
	},
})
