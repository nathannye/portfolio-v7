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

		const boxes = q('[data-box]')
		const firstBox = boxes[0]
		const otherBoxes = boxes.slice(1)
		const bracketOpen = q('[data-bracket-open]')
		const bracketClose = q('[data-bracket-close]')
		const bracketText = q('[data-bracket-text]')
		const title = q('[data-stagger]')
		const headers = q('[data-header]')
		const wrapper = q('[data-wrapper]')

		const tl = gsap.timeline({ paused: true })

		const lineDuration = 2
		const lineEase = 'power2.out'

		tl
			.to(
				wrapper,
				{
					'--before-progress': 1,
					duration: lineDuration,
					ease: lineEase,
				},
				0,
			)
			.to(
				wrapper,
				{
					'--before-translate': '100%',
					duration: lineDuration,
					ease: lineEase,
				},
				0.1,
			)
			.to(
				wrapper,
				{
					'--after-progress': 1,
					duration: lineDuration,
					ease: lineEase,
				},
				0.3,
			)
			.to(
				[bracketOpen, bracketClose],
				{
					duration: 1.4,
					opacity: 1,
					stagger: 0.2,
					ease:
						"rough({strength: 2, points: 14, template: power0.inOut, taper: 'none', randomize: true, clamp: true})",
				},
				0.1,
			)
			.to(
				bracketText,
				{
					duration: 1.4,
					opacity: 1,
					x: 0,
					ease: 'power2.out',
				},
				0,
			)
			.to(
				firstBox,
				{
					opacity: 1,
					duration: 0.8,
					ease:
						"rough({strength: 3, points: 23, template: power0.inOut, taper: 'none', randomize: true, clamp: true})",
				},
				0,
			)
			.to(
				[...title, ...headers],
				{
					opacity: 1,
					duration: 1.4,
					stagger: 0.2,
					ease: 'power2.out',
				},
				0.1,
			)
			.to(
				otherBoxes,
				{
					opacity: 1,
					duration: 1.6,
					stagger: 0.07,
					ease: 'power2.out',
				},
				0.8,
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
