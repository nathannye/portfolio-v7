export default {
	name: 'mediaDuo',
	title: 'Media Duo',
	type: 'object',
	preview: {
		select: {
			media: 'media',
		},
		prepare({ media }: { media: { media: { mediaType: string }; columns: string }[] }) {
			const items = media ?? []
			const title = `${items.length} item${items.length === 1 ? '' : 's'}`
			const subtitle = items
				.map((item) => `${item.media?.mediaType ?? 'image'} - ${item.columns ?? 'full'}col`)
				.join(' | ')
			return { title, subtitle }
		},
	},
	fields: [
		{
			name: 'media',
			type: 'array',
			validation: (Rule) => Rule.required().min(1).max(2),
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'media',
							type: 'media',
						},
						{
							name: 'columns',
							type: 'string',
							options: {
								list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'full'],
								initialValue: 'full',
							},
						},
					],
				},
			],
		},
	],
}
