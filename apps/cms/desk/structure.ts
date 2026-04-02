import { MdEditDocument, MdHome } from 'react-icons/md'
import {
	RiChatPrivateFill,
	RiLayoutBottom2Line,
	RiLayoutMasonryFill,
	RiLayoutTop2Line,
} from 'react-icons/ri'

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
			pageList('Projects', 'project', MdEditDocument),
		])
}
