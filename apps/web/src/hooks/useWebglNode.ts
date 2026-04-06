import { createEffect, createSignal, onCleanup } from 'solid-js'
import { gl } from '~/stores/glStore'

import { Raf } from '~/subscribers/raf'
import { onIntersect, onScroll } from '~/utils'

// (*) prevent recreation if one with same id already exists

export function createWebGlNode(
	self: HTMLElement,
	webglNode: any,
	attachTo: any = null,
) {
	if (!webglNode || !gl.stage) return
	if (!attachTo) attachTo = gl.stage?.scene

	const it = new webglNode(self)

	if (it?.render && typeof it.render === 'function') {
		it.unsub = Raf.add((elapsed: number) => {
			it.render(elapsed)
		})
	}

	attachTo.add(it)
	return it
}

export const useWebglNode = (
	classToInstantiate: any,
	sceneToAttachTo: any = null,
) => {
	const [ref, setRef] = createSignal<HTMLElement | null>(null)
	const [node, setNode] = createSignal<any>(null)

	onScroll((y) => {
		if (node()?.scroll && typeof node().scroll === 'function') {
			node().scroll(y)
		}
	})

	createEffect(() => {
		if (!ref()) return

		setNode(createWebGlNode(ref(), classToInstantiate, sceneToAttachTo))

		// onIntersect(ref(), {
		// 	onEnter: () => {
		// 		node().inView = true
		// 	},
		// 	onLeave: () => {
		// 		node().inView = false
		// 	},
		// })
	})

	onCleanup(() => {
		if (node()?.dispose) node().dispose()
		if (node()?.unsub) node().unsub()
	})

	return { setRef, ref, node }
}
