import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { createEffect, on } from 'solid-js'
import { setOutTransition } from './page-transition'

type Callback =
	| ((duration?: number) => void)
	| (() => Promise<gsap.core.Omit<gsap.core.Tween, 'then'>>)

export function onPageLeave(element?: HTMLElement, fn?: Callback) {
	const vo = createVisibilityObserver({ threshold: 0 })
	const visible = vo(element)

	const wrappedFn = () => (visible() ? fn() : Promise.resolve())

	setOutTransition(wrappedFn)
}

export function onIntersect(
	ref: HTMLElement,
	{ onEnter = () => {}, onLeave = () => {}, once = true, threshold = 0.1 } = {},
) {
	const vo = createVisibilityObserver({ threshold })
	const visible = vo(ref)
	let hasEntered = false

	createEffect(
		on(
			visible,
			(isVisible) => {
				if (isVisible) {
					if (!hasEntered) {
						onEnter()
						if (once) hasEntered = true
					}
				} else {
					// Only trigger leave if we aren't in 'once' mode
					// and we've actually entered before
					if (!once) onLeave()
				}
			},
			{ defer: false },
		),
	)
}
