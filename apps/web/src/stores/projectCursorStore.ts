import { createStore } from 'solid-js/store'

const indexListeners = new Set<(index: number) => void>()

export function subscribeProjectImageIndex(fn: (index: number) => void) {
	indexListeners.add(fn)
	return () => indexListeners.delete(fn)
}

function emitProjectImageIndex(index: number) {
	for (const fn of indexListeners) fn(index)
}

const [projectCursor, setStore] = createStore({
	images: [] as string[],
	index: 0,
})

/** Same as Solid `setStore`, but notifies GL when `index` changes so only one preview can be active. */
export function setProjectCursor(...args: unknown[]) {
	if (args.length >= 2 && args[0] === 'index' && typeof args[1] === 'number') {
		setStore('index', args[1])
		emitProjectImageIndex(args[1])
		return
	}
	// Nested paths e.g. setProjectCursor('images', idx, url)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	;(setStore as any)(...args)
}

export { projectCursor }
