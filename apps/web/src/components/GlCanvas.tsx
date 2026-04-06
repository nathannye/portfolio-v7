import cx from 'classix'
import { onCleanup, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'
import Stage from '~/gl/Stage'
import { useWindowResize } from '~/hooks/useResize'
import { Raf } from '~/subscribers/raf'
import { onScroll } from '~/utils'

export default function GlCanvas() {
	let el: HTMLDivElement | undefined
	let stage: Stage | undefined

	onMount(() => {
		if (isServer) return
		stage = new Stage()

		if (!stage) return
		stage.init(el)
		stage.resize()
		Raf.add(() => stage.render())

		useWindowResize(() => {
			stage.resize()
		})

		onScroll((scroll) => {
			stage.scroll(scroll)
		})
	})

	// onCleanup(() => {
	// 	if (isServer) return
	// 	Stage.destroy()
	// })

	return (
		<div data-gl="canvas" class={cx('fixed h-[100lvh] -z-1 w-full inset-0')}>
			<div class="size-full [&_canvas]:size-full" ref={el} />
		</div>
	)
}
