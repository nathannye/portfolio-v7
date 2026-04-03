import { MdEditDocument } from 'react-icons/md'
import createPage from '../../utils/createPage'
import { createPreview } from '../../utils/preview'

/** Labels for project stack tags; order in Studio follows locale-aware sort. */
const projectStackLabels = [
	'Dato',
	'Contentful',
	'Next.js',
	'Sanity',
	'Solid',
	'Three',
	'GSAP',
	// 'Tailwind',
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
			name: 'description',
			description: 'Used as meta description, not visible on the frontend',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'mainImage',
			type: 'image',
		},
		{
			name: 'year',
			type: 'number',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'liveLink',
			type: 'url',
		},
		{
			name: 'stack',
			type: 'array',
			validation: (Rule) => Rule.required(),
			of: [{ type: 'string' }],
			options: {
				list: projectStackLabels,
			},
		},
		{
			name: 'role',
			validation: (Rule) => Rule.required(),
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
