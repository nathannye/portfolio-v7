import { HiDocumentText } from 'react-icons/hi'
import createPage from '../../utils/createPage'

export default createPage({
	name: 'page',
	title: 'Page',
	slices: true,
	schemaMarkupType: 'WebPage',
	hasParentPage: true,
	preview: {
		select: {
			title: 'title',
			slug: 'fullSlug',
		},
		prepare({ title, slug }) {
			return {
				title,
				subtitle: slug,
				media: HiDocumentText,
			}
		},
	},
})
