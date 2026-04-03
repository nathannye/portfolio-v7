import { MdDocumentScanner } from 'react-icons/md'
import createPage from '../../utils/createPage'

export default createPage({
	name: 'margin',
	title: 'Margin',
	icon: MdDocumentScanner,
	prefix: '/margins',
	body: true,
	slices: false,
	fields: [
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
