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
				el.style.transform = `translateY(${progress * (DISTANCE / 2)}%)`
			},
			{
				top: 'bottom',
				bottom: 'top',
			},
			// {
			// 	top: 'bottom',
			// 	// bottom: 'bottom',
			// },
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
