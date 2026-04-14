import { useBeforeLeave } from '@solidjs/router'
import gsap from 'gsap'
import { createStore } from 'solid-js/store'
import { setNav } from '~/stores/navStore'
import { Scroll } from '~/subscribers/scroll'

export const TRANSITION = {
	duration: 0.575,
	ease: 'power3.out',
}

let outTransitions = [] as ((props: { to: string; from: string }) => any)[]

export const setOutTransition = (
	fn: (props: { to: string; from: string }) => any,
) => {
	outTransitions.push(fn)
}

export function reset() {
	outTransitions.length = 0
	outTransitions = []
}

export const [transitionStore, setTransitionStore] = createStore({
	isTransitioning: false,
})

export async function animateOut({ to, from }: { to: string; from: string }) {
	return await gsap.to('[data-page]', {
		opacity: 0,
		...TRANSITION,
	})
}

export function usePageTransition() {
	useBeforeLeave(async (e: any) => {
		const root = document.documentElement
		const body = document.body
		root.style.cursor = 'wait'
		body.style.pointerEvents = 'none'
		const to = e.to
		const from = e.from.pathname

		e.preventDefault()

		await animateOut({ to, from }).then(() => {
			Scroll.lenis?.scrollTo(0, { immediate: true })
			Scroll.lenis?.stop()
			Scroll.lenis?.start()
			setNav('hidden', false)
			setNav('scrolled', false)
			root.style.cursor = 'default'
			body.style.pointerEvents = 'auto'
		})

		e.retry(true)
	})
}
