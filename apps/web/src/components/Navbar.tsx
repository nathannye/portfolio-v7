import { A } from '@solidjs/router'
import cx from 'classix'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { onScroll } from '~/utils'

export default function Navbar() {
	let interval: any
	const [time, setTime] = createSignal<string | null>(null)
	const [isScrolled, setIsScrolled] = createSignal(false)

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

		onScroll(({ scroll }) => {
			if (scroll > 0 && !isScrolled()) {
				setIsScrolled(true)
			} else if (scroll === 0 && isScrolled()) {
				setIsScrolled(false)
			}
		})
	})

	onCleanup(() => {
		interval && clearInterval(interval)
	})

	return (
		<header
			class={cx(
				'eyebrow after:origin-top after:scale-y-0 z-20 after:absolute after:inset-0 after:size-full after:bg-primary flex after:z-1 pt-8 px-margin-1 fixed top-0 left-0 right-0 max-lg:justify-between	 after:duration-600 after:ease-expo-out pb-6',
				isScrolled() && 'after:scale-y-100',
			)}
		>
			<A
				href="/"
				aria-label="Home"
				class="eyebrow w-grid-1 shrink-0 lg:w-grid-4-w relative z-2"
			>
				Nathan Nye
			</A>
			<dl class="flex eyebrow gap-gutter-1 relative z-2">
				<dt class="w-grid-1 text-right">Get in touch</dt>
				<dd class="lg:w-grid-3-w">nathan@nye.dev</dd>
			</dl>
			<dl class="flex max-lg:justify-end max-lg:text-right max-lg:w-full eyebrow gap-x-gutter-1 relative z-2">
				<dt>Denver, CO</dt>
				<dd>MST {time()}</dd>
			</dl>
		</header>
	)
}
