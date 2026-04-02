import {
	type BeforeLeaveEventArgs,
	useBeforeLeave,
	useIsRouting,
	useNavigate,
	usePreloadRoute,
} from '@solidjs/router'
import gsap from 'gsap'
import { onCleanup } from 'solid-js'
import { Scroll } from '../subscribers/scroll'

/** Seconds — `<main>` opacity during SPA navigations. */
const MAIN_OUT_DURATION = 0.4
const MAIN_IN_DURATION = 0.4
const MAIN_IN_DELAY = 0.0

let outTransitions = [] as (() => void | Promise<void>)[]

export const setOutTransition = (fn: () => void | Promise<void>) => {
	outTransitions.push(fn)
}

export function reset() {
	outTransitions.length = 0
}

export async function animateOut() {
	if (outTransitions.length === 0) return
	await Promise.all(outTransitions.map((fn) => Promise.resolve(fn())))
	reset()
}

/** Router transition completes after a frame; rAF avoids starving Solid’s update. */
async function whenRoutingSettled(isRouting: () => boolean) {
	await Promise.resolve()
	while (isRouting()) {
		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => resolve())
		})
	}
}

export function usePageTransition() {
	const navigate = useNavigate()
	const isRouting = useIsRouting()
	const preload = usePreloadRoute()
	let transitioning = false

	useBeforeLeave(async (e: BeforeLeaveEventArgs) => {
		if (transitioning) return
		e.preventDefault()
		transitioning = true

		if (typeof window !== 'undefined') {
			preload(e.to, { preloadData: true })
			await new Promise<void>((resolve) => queueMicrotask(resolve))
		}

		await animateOut()
		await gsap.to('main', { opacity: 0, duration: MAIN_OUT_DURATION })
		Scroll.lenis?.scrollTo(0, { immediate: true })

		navigate(e.to, { ...e.options, resolve: false, scroll: false })
		await whenRoutingSettled(isRouting)
		transitioning = false

		gsap.to('main', {
			opacity: 1,
			duration: MAIN_IN_DURATION,
			delay: MAIN_IN_DELAY,
		})
	})

	// if (typeof window !== 'undefined') {
	// 	const handlePopState = async () => {
	// 		await animateOut()
	// 		Scroll.lenis?.scrollTo(0, { immediate: true })
	// 	}

	// 	window.addEventListener('popstate', handlePopState)
	// 	onCleanup(() => window.removeEventListener('popstate', handlePopState))
	// }
}
