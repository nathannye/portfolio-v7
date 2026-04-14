import { inject } from '@vercel/analytics'
import type { JSX } from 'solid-js'
import { onMount, Show } from 'solid-js'
import { isServer } from 'solid-js/web'
import { useWindowResize } from '~/hooks/useResize'
// biome-ignore lint/correctness/noUnusedImports: bound by Solid `use:scroll` at compile time
import { scroll } from '~/subscribers/scroll'
import { usePageTransition } from '~/utils'
import { setCssVariable } from '~/utils/css'
import Footer from './Footer'
import GridOverlay from './GridOverlay'
import Navbar from './Navbar'
import WebSiteMarkup from './WebSiteMarkup'

export default function GlobalLayout({ children }: { children: JSX.Element }) {
	let el: HTMLElement | null = null
	usePageTransition()

	const getScrollbarWidth = () => {
		let width = 0
		if (!el || isServer) return width

		width = document.documentElement.offsetWidth - el.offsetWidth

		setCssVariable('--scrollbar', `${width}px`)
	}

	useWindowResize(getScrollbarWidth)

	onMount(() => {
		inject()
		getScrollbarWidth()
	})

	return (
		<>
			<Show when={process.env.NODE_ENV === 'development'}>
				<GridOverlay />
			</Show>
			<Navbar />
			<WebSiteMarkup />

			<div ref={el} data-page class="opacity-0">
				<main class="min-h-[100lvh]" use:scroll>
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}
