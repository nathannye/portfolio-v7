import { defineArrayMember, defineField } from 'sanity'

export default {
	name: 'settings.header',
	type: 'document',
	preview: {
		prepare() {
			return {
				title: 'Navigation Lists',
			}
		},
	},
	fields: [
		defineField({
			name: 'topMenuLinks',
			title: 'Top menu links',
			description:
				'First row: ABOUT, MEDIA, LABS, EVENTS. Each can have a flyover panel.',
			type: 'array',
			of: [{ type: 'navLinkBasic' }],
			validation: (Rule) => Rule.min(1),
		}),
		defineField({
			name: 'topMenuPanels',
			title: 'Top menu panels',
			description:
				'Flyover content for each top link. Panel ID must match a top menu link ID.',
			type: 'array',
			of: [{ type: 'topMenuPanel' }],
		}),
		defineField({
			name: 'mediaSecondaryNav',
			title: 'Media secondary nav',
			description:
				'Second row shown on non-event pages (articles, webinars, etc.). One config for all media pages.',
			type: 'secondaryNav',
		}),
		defineField({
			name: 'navList',
			title: 'Reusable nav lists',
			description: 'Optional reusable link lists for other components.',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'navList',
					fields: [
						{ name: 'title', type: 'string', title: 'Title' },
						{
							name: 'links',
							type: 'array',
							of: [
								defineArrayMember({ type: 'navLinkBasic' }),
								defineArrayMember({ type: 'navEventsWidget' }),
							],
							description:
								'Add regular links and/or an events widget (shows the next 3 events sorted by date).',
							validation: (Rule) => Rule.min(1),
						},
					],
					preview: {
						select: { title: 'title', links: 'links' },
						prepare({ title, links }) {
							const count = links?.length ?? 0
							return { title: title || 'Nav list', subtitle: `${count} link(s)` }
						},
					},
				}),
			],
		}),
	],
}
