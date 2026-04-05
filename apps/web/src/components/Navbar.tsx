import { A, useLocation } from '@solidjs/router'
import cx from 'classix'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { nav, setNav } from '~/stores/navStore'
import { onScroll } from '~/utils'
import { wrapArray } from '~/utils/array'
import { copyToClipboard } from '~/utils/clipboard'

const copyText = [
	'Copied!',
	'Copied!',
	'Copied, again 👀',
	'Copied, again 👀',
	'Seriously?',
	`You can stop anytime...`,
]

export default function Navbar() {
	let interval: any
	const [time, setTime] = createSignal<string | null>(null)
	const [copied, setCopied] = createSignal(false)
	const [copyCount, setCopyCount] = createSignal(0)

	const location = useLocation()
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

	const handleCopy = () => {
		copyToClipboard('nathan@nye.dev')
		setCopied(true)
		setCopyCount(copyCount() + 1)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	onCleanup(() => {
		interval && clearInterval(interval)
	})

	return (
		<header
			class={cx(
				'eyebrow after:origin-top after:scale-y-0 z-20 after:absolute after:inset-0 after:size-full after:bg-primary flex after:z-1 pt-8 px-margin-1 fixed top-0 left-0 w-[calc(100vw-var(--scrollbar))] max-lg:justify-between duration-800 ease-expo-out after:duration-800 after:ease-expo-out pb-6',
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
			<dl class="flex eyebrow max-lg:w-[85%] max-lg:justify-between gap-gutter-1 opacity-80 relative z-2">
				<dt class="w-180 lg:w-grid-2 text-right">
					Get in touch <span class="inline-block ml-10">→</span>
				</dt>
				<dd class="lg:w-grid-4-w">
					<button
						type="button"
						onClick={handleCopy}
						aria-label="Copy email nathan@nye.dev to clipboard"
						class="underline relative cursor-copy uppercase"
					>
						<div
							class={cx('relative z-1 duration-200', copied() && 'opacity-0 pointer')}
						>
							nathan@nye.dev
						</div>
						<div
							class={cx(
								'opacity-0 whitespace-nowrap text-accent duration-200 absolute top-0 left-0',
								copied() && 'opacity-100',
							)}
						>
							{wrapArray(copyText, copyCount())}
						</div>
					</button>
				</dd>
			</dl>
			<dl class="flex max-lg:hidden opacity-80 max-lg:text-right max-lg:w-full eyebrow gap-x-gutter-1 relative z-2">
				<dt>Denver, CO</dt>
				<dd>MST {time()}</dd>
			</dl>
		</header>
	)
}
