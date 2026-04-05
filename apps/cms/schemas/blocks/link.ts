import { CgExternal } from 'react-icons/cg'
import { MdLink } from 'react-icons/md'
import LinkOptions from '../../components/LinkOptions/LinkOptions'

export default {
	type: 'object',
	name: 'link',
	components: {
		input: LinkOptions,
	},
	options: {
		noLabel: true,
	},
	preview: {
		select: {
			title: 'linkType',
			url: 'url',
			label: 'label',
			page: 'page._ref',
			fullSlug: 'page.fullSlug',
			slug: 'page.slug.current',
		},
		prepare({ title, url, page, label, fullSlug, slug }) {
			return {
				title: label,
				icon: title.toLowerCase() === 'internal' ? CgExternal : MdLink,
				subtitle: fullSlug || slug || 'No Slug',
			}
		},
	},
	fields: [
		{
			name: 'linkType',
			type: 'string',
			initialValue: 'internal',
		},
		{
			name: 'label',
			type: 'string',
		},
		{
			name: 'url',
			type: 'string',
			title: 'URL',
			description: 'Must start with https://, mailto:, or tel:',
			hidden: ({ parent }) => parent?.linkType === 'internal',
			validation: (Rule) =>
				Rule.custom((value) => {
					if (!value) return true
					if (value.startsWith('/')) return false // disallow regular page links
					if (
						value?.startsWith('mailto:') ||
						value?.startsWith('tel:') ||
						value?.startsWith('https://')
					) {
						return true
					}
					if (value?.startsWith('http://')) {
						return 'http:// is not supported. Please use https:// instead.'
					}

					return "URL must start with https://, mailto:, or tel:. To link to another page, select 'Page' instead."
				}),
		},
		{
			name: 'page',
			type: 'reference',
			to: [{ type: 'home' }, { type: 'project' }, { type: 'margin' }],
			hidden: ({ parent }) => parent?.linkType !== 'internal',
		},
		{
			name: 'advanced',
			description: 'Advanced link options',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					name: 'noFollow',
					type: 'boolean',
					title: 'No Follow',
					initialValue: false,
				},
				{
					name: 'noReferrer',
					type: 'boolean',
					initialValue: false,
					title: 'No Referrer',
				},
				{
					name: 'newTab',
					type: 'boolean',
					title: 'New Tab',
					description:
						'If true, the link will open in a new tab (via target="_blank"). Defaults to false.',
				},
			],
		},
	],
}
