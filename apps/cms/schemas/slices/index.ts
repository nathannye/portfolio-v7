// append

import { createSliceSet } from '../../utils/create'
import mediaDuo from './mediaDuo'

const globalPageSlices = [mediaDuo]

const slices = createSliceSet({
	name: 'pageSlices',
	title: 'Page Slices',
	slices: globalPageSlices,
})

export default [slices, ...globalPageSlices]
