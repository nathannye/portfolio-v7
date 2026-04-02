import { MdHome } from 'react-icons/md'
import createPage from '../../utils/createPage'

export default createPage({
	title: 'Home',
	name: 'home',
	icon: MdHome,
	slices: false,
	slug: false,
	fields: [
		{
			name: 'headline',
			type: 'string',
			description: 'Use { and } to emphasize text.',
			title: 'Headline',
		},
		{
			name: 'blurb',
			type: 'text',
			rows: 3,
		},
	],
})
