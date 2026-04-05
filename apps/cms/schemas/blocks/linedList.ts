import ButtonSelector from '../../components/ButtonSelector'
import { createPreview } from '../../utils/preview'

export default {
	name: 'linedList',
	title: 'Lined List',
	type: 'object',
	preview: {
		select: {
			items: 'items',
		},
		prepare({ items }) {
			return {
				title: 'Lined List',
				subtitle: `${items.length} item${items.length === 1 ? '' : 's'}`,
			}
		},
	},
	fields: [
		{
			name: 'sort',
			components: {
				input: ButtonSelector,
			},
			type: 'string',
			options: {
				list: [
					{ title: 'Alphabetical', value: 'alpha' },
					{ title: 'Original', value: 'original' },
				],
				layout: 'radio',
			},
			initialValue: 'original',
		},
		{
			name: 'items',
			type: 'array',
			validation: (Rule) => Rule.required().min(1),
			preview: createPreview('title', 'description'),
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'link',
							type: 'link',
						},
						{
							name: 'title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'description',
							type: 'text',
							hidden: true,
							rows: 3,
						},
					],
				},
			],
		},
	],
}
