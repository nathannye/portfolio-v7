
import InputWithGlobalDefault from '../../../components/core/InputWithGlobalDefault'
import PageSeoInput from '../../../components/core/PageSeoInput/PageSeoInput'

export default {
	name: 'metadata',
	title: 'Metadata',
	group: 'seo',
	components: {
		input: PageSeoInput,
	},
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Page Title',
			description:
				'Used to override the page title in search results only, does not render to page.',
		},
		{
			name: 'description',
			title: 'Meta Description',
			components: {
				input: InputWithGlobalDefault,
			},
			options: {
				matchingDefaultField: 'metaDescription',
			},
			type: 'text',
			rows: 3,
			description:
				'The description displayed when a user finds the site in search results. Defaults to the description provided in Settings > SEO.',
			validation: (Rule) =>
				Rule.max(160).warning(
					'Long titles (over 160 characters) will be truncated by Google.',
				),
		},
		{
			name: 'searchVisibility',
			type: 'searchVisibility',
		},
		{
			name: 'metaImage',
			components: {
				input: InputWithGlobalDefault,
			},
			options: {
				matchingDefaultField: 'metaImage',
			},
			title: 'Meta Image',
			description:
				'Displayed when the site link is posted on social media, defaults to a screenshot of the homepage.',
			type: 'image',
		},
	],
}
