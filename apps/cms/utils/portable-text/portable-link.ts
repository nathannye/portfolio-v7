
export const portableLink = {
	name: 'link',
	title: 'Link',
	type: 'object',
	fields: [
		{
			name: 'url',
			type: 'string',
			title: 'URL',
			description: 'The URL of the link',
		},
		// {
		// 	name: 'page',
		// 	type: 'reference',
		// 	to: [...ALL_PAGES],
		// },
		{
			name: 'linkType',
			type: 'string',
			options: {
				list: [
					{ title: 'Internal', value: 'internal' },
					{ title: 'External', value: 'external' },
				],
			},
		},
		{
			name: 'advanced',
			description: 'Advanced link options',
			type: 'object',
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
