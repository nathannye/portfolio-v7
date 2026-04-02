import { onCleanup, onMount } from 'solid-js'
import { type ResizeData, Resizer } from '~/subscribers/resizer'

type ResizeCallback = (params: ResizeData) => void

/**
 * Subscribes to the shared window/body {@link Resizer}. Invokes `callback` only when
 * **width or height** changes vs the previous notification (skips duplicate dimensions).
 */
export const useWindowResize = (callback: ResizeCallback) => {
	let lastWidth: number | undefined
	let lastHeight: number | undefined

	const cb = (data: ResizeData) => {
		const { width, height } = data
		if (lastWidth === width && lastHeight === height) return
		lastWidth = width
		lastHeight = height
		callback(data)
	}

	onMount(() => {
		const unsubscribe = Resizer.add(cb)
		onCleanup(unsubscribe)
	})
}
