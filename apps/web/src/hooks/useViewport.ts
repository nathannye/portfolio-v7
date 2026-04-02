import { onCleanup, onMount } from 'solid-js'
import { setViewport } from '~/stores/viewportStore'
import { type ResizeData, Resizer } from '~/subscribers/resizer'

/**
 * Keeps the shared `viewport` store in sync with the window size.
 * Subscribes to the same {@link Resizer} used by `useWindowResize` — no second
 * `ResizeObserver` on `document.body`.
 */
export function useViewport() {
	onMount(() => {
		const w = window.innerWidth
		const h = window.innerHeight
		setViewport('size', { width: w, height: h })

		let lastWidth = w
		let lastHeight = h

		const onResize = (_data: ResizeData) => {
			const width = window.innerWidth
			const height = window.innerHeight
			if (width === lastWidth && height === lastHeight) return
			lastWidth = width
			lastHeight = height
			setViewport('size', { width, height })
		}

		const unsubscribe = Resizer.add(onResize)
		onCleanup(unsubscribe)
	})
}
