import type { JSX } from 'solid-js'
import { onMount, Show } from 'solid-js'
import { isServer } from 'solid-js/web'
import { useWindowResize } from '~/hooks/useResize'
import { setCssVariable } from '~/utils/css'
import GridOverlay from './GridOverlay'
import Navbar from './Navbar'

export default function GlobalLayout({ children }: { children: JSX.Element }) {
	let el: HTMLElement | null = null

	const getScrollbarWidth = () => {
		let width = 0
		if (!el || isServer) return width

		width = document.documentElement.offsetWidth - el.offsetWidth

		console.log({
			width,
			d: document.documentElement.offsetWidth,
			e: el.offsetWidth,
		})

		setCssVariable('--scrollbar', `${width}px`)
	}

	useWindowResize(getScrollbarWidth)

	onMount(() => {
		getScrollbarWidth()
	})

	return (
		<>
			<Show when={process.env.NODE_ENV === 'development'}>
				<GridOverlay />
			</Show>
			<Navbar />

			<main ref={el} use:scroll>
				{children}
			</main>
		</>
	)
}
