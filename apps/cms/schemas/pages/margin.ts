import { MdDocumentScanner } from 'react-icons/md'
import createPage from '../../utils/createPage'
import { createPortableText } from '../../utils/portable-text/createPortableText'

export default createPage({
	name: 'margin',
	title: 'Margin',
	icon: MdDocumentScanner,
	prefix: '/margins',
	body: true,
	slices: false,
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
