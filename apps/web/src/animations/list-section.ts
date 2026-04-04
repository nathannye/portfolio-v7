import gsap from 'gsap'
import { RoughEase } from 'gsap/all'
import { onMount } from 'solid-js'
import { onIntersect } from '~/utils'
import { parseAnimation } from '~/utils/animation'

export const listSectionAnimation = (el: HTMLElement) => {
	const { q } = parseAnimation(el)
	gsap.registerPlugin(RoughEase)

	onMount(() => {
		if (!el) return

		const boxes = q('[data-counter-boxes]')
		const bracketOpen = q('[data-bracket-open]')
		const bracketClose = q('[data-bracket-close]')
		const bracketText = q('[data-bracket-text]')
		const title = q('[data-stagger]')
		const headers = q('[data-header]')

		const tl = gsap.timeline({ paused: true })

		tl.to([...title, ...headers], {
			opacity: 1,
			duration: 1.4,
			stagger: 0.07,
			ease: 'power2.out',
		})

		// Bracket animation
		tl
			.to(
				[bracketOpen, bracketText],
				{
					duration: 1.4,
					opacity: 1,
					stagger: 0.2,
					ease:
						"rough({strength: 5, points: 20, template: power0.inOut, taper: 'none', randomize: true, clamp: true})",
				},
				0.4,
			)
			.to(
				bracketClose,
				{
					duration: 1.4,
					opacity: 1,
					x: 0,
					ease: 'power2.out',
				},
				0,
			)

		onIntersect(el, {
			onEnter: () => {
				tl.play()
			},
			onLeave: () => {
				tl.progress(0).pause()
			},
			once: false,
		})
	})
}
