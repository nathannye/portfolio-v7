const linkWithLabel = {
	type: 'object',
	fields: [
		{ name: 'label', type: 'string' },
		{ name: 'link', type: 'link' },
	],
}

const linkGroup = {
	type: 'object',
	fields: [
		{ name: 'label', type: 'string' },
		{
			name: 'links',
			type: 'array',
			of: [linkWithLabel],
		},
	],
}

export default {
	name: 'settings.footer',
	type: 'document',
	preview: {
		prepare() {
			return {
				title: 'Footer',
			}
		},
	},
	fields: [
		{
			name: 'address',
			type: 'text',
			rows: 4,
		},
		{
			name: 'leftLinks',
			type: 'array',
			of: [linkGroup],
		},
		{
			name: 'rightLinks',
			type: 'array',
			of: [linkGroup],
		},
		{
			name: 'additionalLinks',
			description:
				'Certain page subsets (ex: events) can have additional links added to the footer. ',
			type: 'object',
			fields: [
				{
					name: 'events',
					description: 'Links added to the footer when on event pages',
					type: 'array',
					of: [linkGroup],
				},
				{
					name: 'resources',
					type: 'array',
					description:
						'Links added to the footer when on article, webinar, and roundtable pages',
					of: [linkGroup],
				},
			],
		},
		{
			name: 'legalLinks',
			type: 'array',
			of: [linkWithLabel],
		},
	],
}
