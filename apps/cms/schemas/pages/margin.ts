import { MdDocumentScanner } from 'react-icons/md'
import createPage from '../../utils/createPage'
import { createPortableText } from '../../utils/portable-text/createPortableText'
import { portableTextToString } from '../../utils/string'

export default createPage({
	name: 'margin',
	title: 'Margin',
	icon: MdDocumentScanner,
	prefix: '/margins',
	body: true,
	slices: false,
	preview: {
		select: {
			title: 'title',
			slug: 'slug',
			excerpt: 'excerpt',
			tag1: 'tags.0.name',
			tag2: 'tags.1.name',
			tag3: 'tags.2.name',
		},
		prepare({ title, tag1, tag2, tag3, tags }) {
			return {
				title,
				subtitle: [tag1, tag2, tag3].filter(Boolean).join(', '),
			}
		},
	},
	fields: [
		createPortableText('excerpt', {
			headings: [],
			lists: [],
			disableLinks: true,
			decorators: ['code', 'bold', 'italic'],
		}),
		{
			name: 'tags',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'tag' }] }],
		},
		{
			name: 'firstPublished',
			type: 'date',
		},
	],
})
