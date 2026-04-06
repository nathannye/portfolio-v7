import { useLocation } from '@solidjs/router'
import cx from 'classix'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'
import Stage from '~/gl/Stage'
import { useWindowResize } from '~/hooks/useResize'
import { gl, setGl } from '~/stores/glStore'
import { Raf } from '~/subscribers/raf'
import { onScroll } from '~/utils'

export default function GlCanvas() {
	let el: HTMLDivElement | undefined

	const location = useLocation()

	onMount(() => {
		if (isServer) return
		setGl('stage', new Stage())
		gl.stage?.init(el)

		if (!gl.stage) return
		gl.stage?.init(el)
		gl.stage?.resize()
		Raf.add(() => gl.stage?.render())

		useWindowResize(() => {
			gl.stage?.resize()
		})

		onScroll((scroll) => {
			gl.stage?.scroll(scroll)
		})
	})

	createEffect(() => {
		if (gl.stage && location.pathname && !isServer) {
			gl.stage?.navigate(location.pathname)
		}
	})

	return (
		<div data-gl="canvas" class={cx('fixed h-[100lvh] -z-1 w-full inset-0')}>
			<div class="size-full [&_canvas]:size-full" ref={el} />
		</div>
	)
}
