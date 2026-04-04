import gsap from 'gsap'
import { onMount } from 'solid-js'
import { onIntersect } from '~/utils'
import { parseAnimation } from '~/utils/animation'

export const fadeIn = (el: HTMLElement) => {
	const { itemIndex } = parseAnimation(el)
	const DELAY = 0.25 * itemIndex

	onMount(() => {
		if (!el) return
		onIntersect(el, {
			onEnter: () => {
				gsap.to(el, {
					opacity: 1,
					duration: 1.4,
					delay: DELAY,
					ease: 'power2.out',
				})
				gsap.to(el, {
					duration: 1.4,
					y: 0,
					delay: DELAY,
					ease: 'power3.out',
				})
			},
			onLeave: () => {
				gsap.set(el, {
					opacity: 0,
				})
			},
			once: false,
			threshold: 0.1,
		})
	})
}
