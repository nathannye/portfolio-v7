import { MdEditDocument } from 'react-icons/md'
import createPage from '../../utils/createPage'
import { createPreview } from '../../utils/preview'

/** Labels for project stack tags; order in Studio follows locale-aware sort. */
const projectStackLabels = [
	'DatoCMS',
	'Contentful',
	'Next.js',
	'Sanity',
	'Solid',
	'Tailwind',
	'Nuxt',
	'Webflow',
].sort((a, b) => a.localeCompare(b))

export default createPage({
	name: 'project',
	title: 'Project',
	icon: MdEditDocument,
	prefix: '/projects',
	preview: createPreview('title', 'year', 'mainImage'),
	fields: [
		{
			name: 'mainImage',
			type: 'image',
		},
		{
			name: 'year',
			type: 'number',
		},
		{
			name: 'liveLink',
			type: 'url',
		},
		{
			name: 'stack',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: projectStackLabels,
			},
		},
		{
			name: 'role',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
			options: {
				list: ['Design', 'Dev'],
			},
		},
		{
			name: 'partners',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'partner' }] }],
		},
		{
			name: 'awards',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
		},
		{
			name: 'press',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'label',
							type: 'string',
						},
						{
							name: 'url',
							type: 'url',
						},
					],
				},
			],
		},
	],
})
