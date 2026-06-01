import { AiFillTag } from 'react-icons/ai'
import { IoBusiness } from 'react-icons/io5'
import {
	MdCategory,
	MdDocumentScanner,
	MdEditDocument,
	MdHome,
	MdSearch,
} from 'react-icons/md'
import { setupPages } from '../utils/structure-utils'

export const structure = (S, context: any) => {
	const { singlePage, pageList, folder, div, orderablePageList } = setupPages(
		S,
		context,
	)

	return S.list()
		.title('Studio')
		.items([
			singlePage('Home', 'home', MdHome),
			div(),
			pageList('Projects', 'project', MdEditDocument),
			pageList('Partners', 'partner', IoBusiness),
			div(),
			pageList('Margins', 'margin', MdDocumentScanner),
			div(),
			pageList('Tags', 'tag', AiFillTag),
			pageList('Categories', 'category', MdCategory),
			div(),
			singlePage('SEO', 'seo', MdSearch),
		])
}
