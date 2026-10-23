export default {
	name: 'seo',
	title: 'SEO',
	type: 'document',
	groups: [
		{
			name: 'meta',
			title: 'Metadata',
			default: true,
		},
		{
			name: 'social',
			title: 'Social Media Metadata',
		},
	],
	fields: [
		{
			name: 'siteUrl',
			title: 'Site URL',
			group: 'meta',
			type: 'url',
			description:
				'The base URL of the site, including the protocol (e.g. https://)',
		},
		{
			name: 'siteTitle',
			type: 'string',
			group: 'meta',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'jobTitle',
			title: 'Job Title',
			type: 'string',
			group: 'meta',
			description:
				'Used in schema markup and appended to the site title on the homepage.',
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'text',
			rows: 4,
			group: 'meta',
			description:
				'Homepage meta description, Open Graph description, and WebSite schema description.',
			validation: (Rule) =>
				Rule.max(160).warning(
					'Long descriptions (over 160 characters) will be truncated by Google.',
				),
		},
		{
			name: 'bio',
			title: 'Bio',
			type: 'text',
			rows: 4,
			group: 'meta',
			description: 'Person schema description.',
		},
		{
			name: 'metaImage',
			title: 'Meta Image',
			description:
				'Displayed when the site link is posted on social media, defaults to a screenshot of the homepage.',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'twitterHandle',
			title: 'Twitter Handle',
			type: 'string',
			group: 'social',
			description: 'The Twitter handle of the site.',
		},
		{
			name: 'robots',
			title: 'Robots',
			type: 'string',
			group: 'meta',
			description:
				'Optional, if you want to specify specific rules for different user agents. This defaults to allowing access to all routes.',
		},
	],
	preview: {
		prepare() {
			return {
				title: 'SEO',
			}
		},
	},
}
