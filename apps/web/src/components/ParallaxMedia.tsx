import cx from 'classix'
import { onMount } from 'solid-js'
import { onTrack } from '~/utils'

export default function ParallaxMedia(props) {
	let wrapper: HTMLDivElement
	let el: HTMLDivElement

	const DISTANCE = 19

	onMount(() => {
		if (!wrapper || !el) return
		onTrack(
			el,
			(progress) => {
				const val = progress * (DISTANCE / 2)
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
			<div ref={el} class="origin-bottom scale-[var(--scale)]">
				{props.children}
			</div>
		</div>
	)
}
