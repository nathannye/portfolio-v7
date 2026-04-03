import cx from 'classix'
import { onMount } from 'solid-js'
import { Resizer } from '~/subscribers/resizer'
import { onTrack } from '~/utils'

interface ParallaxMediaProps {
	children: any
	class: string
	speed: number
}

export default function ParallaxMedia(props) {
	let wrapper: HTMLDivElement
	let el: HTMLDivElement

	const DISTANCE = 25 * (props.speed || 1)

	onMount(() => {
		if (!wrapper || !el) return
		onTrack(
			el,
			(progress) => {
				const isMobile = Resizer.isMobile
				const d = isMobile ? DISTANCE * 1.3 : DISTANCE
				const val = progress * (d / 2)
				el.style.transform = `translateY(${val}%)`
			},
			{
				top: 'bottom',
				bottom: 'top',
			},
		)
	})

	return (
		<div
			style={{
				'--scale': `${100 + DISTANCE}%`,
			}}
			ref={wrapper}
			{...props}
			class={cx('overflow-hidden', props.class)}
		>
			<div ref={el} class="origin-bottom w-full h-auto scale-[var(--scale)]">
				{props.children}
			</div>
		</div>
	)
}
