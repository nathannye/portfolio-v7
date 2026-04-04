import { A, useLocation } from '@solidjs/router'
import cx from 'classix'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { nav, setNav } from '~/stores/navStore'
import { onScroll } from '~/utils'

export default function Navbar() {
	let interval: any
	const [time, setTime] = createSignal<string | null>(null)
	const location = useLocation()
	console.log(location)
	const getTime = () => {
		return new Intl.DateTimeFormat('en-US', {
			timeStyle: 'short',
			timeZone: 'America/Denver',
		}).format(new Date())
	}

	onMount(() => {
		setTime(getTime())
		interval = setInterval(() => {
			setTime(getTime())
		}, 1000)

		onScroll(({ scroll, direction }) => {
			if (direction === 1 && !nav.hidden) {
				setNav('hidden', true)
			} else if (direction === -1 && nav.hidden) {
				setNav('hidden', false)
			}

			if (scroll > 0 && !nav.scrolled) {
				setNav('scrolled', true)
			} else if (scroll === 0 && nav.scrolled) {
				setNav('scrolled', false)
			}
		})
	})

	onCleanup(() => {
		interval && clearInterval(interval)
	})

	return (
		<header
			class={cx(
				'eyebrow after:origin-top after:scale-y-0 z-20 after:absolute after:inset-0 after:size-full after:bg-primary flex after:z-1 pt-8 px-margin-1 fixed top-0 left-0 right-0 max-lg:justify-between duration-800 ease-expo-out after:duration-800 after:ease-expo-out pb-6',
				nav.scrolled && 'after:scale-y-100',
				nav.hidden && '-translate-y-full',
			)}
		>
			<A
				href="/"
				aria-label="Home"
				class={cx(
					'eyebrow lg:w-grid-1 shrink-0 font-[165] lg:w-grid-3-w relative z-2',
					location.pathname === '/' && 'pointer-events-none select-none',
				)}
			>
				Nathan Nye
			</A>
			<dl class="flex eyebrow gap-gutter-1 opacity-80 relative z-2">
				<dt class="w-grid-2 text-right">
					Get in touch <span class="inline-block ml-10">→</span>
				</dt>
				<dd class="lg:w-grid-3-w">
					<a href="mailto:nathan@nye.dev" class="underline">
						nathan@nye.dev
					</a>
				</dd>
			</dl>
			<dl class="flex max-lg:hidden opacity-80 max-lg:text-right max-lg:w-full eyebrow gap-x-gutter-1 relative z-2">
				<dt>Denver, CO</dt>
				<dd>MST {time()}</dd>
			</dl>
		</header>
	)
}
