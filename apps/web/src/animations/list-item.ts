import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { onMount } from 'solid-js'
import { onIntersect } from '~/utils'
import { parseAnimation } from '~/utils/animation'

export const listItemAnimation = (el: HTMLElement) => {
	gsap.registerPlugin(SplitText)
	const { itemIndex, q } = parseAnimation(el)

	const BASE_DELAY = 0.13 * itemIndex

	onMount(() => {
		if (!el) return
		const tl = gsap.timeline({ paused: true }).timeScale(1.24)
		const staggers = q('[data-stagger]')

		const splits = Array.from(staggers).map(
			(stagger) =>
				new SplitText(stagger, {
					type: 'words,lines',
					linesClass: 'overflow-hidden',
				}),
		)

		splits.forEach((split, index) => {
			gsap.set(split.words, {
				yPercent: 100,
			})
		})

		tl.to(
			el,
			{
				'--scale': 1,
				opacity: 1,
				duration: 2,
				ease: 'power4.out',
			},
			BASE_DELAY,
		)
		splits.forEach((split, index) => {
			const delay = BASE_DELAY + index * 0.1
			tl
				.to(
					split.words,
					{
						yPercent: 0,
						stagger: 0.02,
						duration: 1.35,
						ease: 'power4.out',
					},
					delay,
				)
				.from(
					split.words,
					{
						duration: 1.35,
						color: '#159c88',
						ease: 'power2.out',
					},
					'<',
				)
		})

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
