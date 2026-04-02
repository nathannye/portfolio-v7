import { A } from '@solidjs/router'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { onScroll } from '~/utils'

export default function Navbar() {
	let interval: any
	const [time, setTime] = createSignal<string | null>(null)

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

		onScroll((progress) => {
			console.log(progress)
		})
	})

	onCleanup(() => {
		interval && clearInterval(interval)
	})

	return (
		<header class="eyebrow flex pt-11 px-margin-1 fixed top-0 left-0 right-0">
			<A href="/" aria-label="Home" class="w-grid-4-w">
				Nathan Nye
			</A>
			<dl class="flex gap-gutter-1">
				<dt class="w-grid-1 text-right">Get in touch</dt>
				<dd class="w-grid-3-w">nathan@nye.dev</dd>
			</dl>
			<dl class="flex gap-gutter-1">
				<dt>Denver, CO</dt>
				<dd>MST {time()}</dd>
			</dl>
		</header>
	)
}
