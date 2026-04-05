import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { onMount } from 'solid-js'
import { onIntersect } from '~/utils'
import { parseAnimation } from '~/utils/animation'

export const listItemAnimation = (el: HTMLElement) => {
	gsap.registerPlugin(SplitText)
	const { itemIndex, q } = parseAnimation(el)

	const BASE_DELAY = 0.325 * itemIndex

	onMount(() => {
		if (!el) return
		const tl = gsap.timeline({ paused: true, delay: BASE_DELAY }).timeScale(1.24)
		const staggers = q('[data-fade]')
		const wrapper = q('[data-wrapper]')

		tl
			.to(
				wrapper,
				{
					y: 0,
					duration: 1.2,
					ease: 'power3.out',
				},
				0,
			)
			.to(
				el,
				{
					'--scale': 1,
					opacity: 1,
					duration: 2,
					ease: 'power4.out',
				},
				0.1,
			)
		tl.from(
			staggers,
			{
				opacity: 0,
				duration: 1.35,
				ease: 'power2.out',
				stagger: 0.08,
			},
			0.1,
		)

		onIntersect(el, {
			onEnter: () => {
				tl.play()
			},
			onLeave: () => {
				tl.progress(0).pause()
			},
		})
	})
}
