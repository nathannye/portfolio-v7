import cx from 'classix'
import { createEffect, createSignal, For, onMount } from 'solid-js'
import { useKeypress } from '~/hooks/useKeypress'
import { useWindowResize } from '~/hooks/useResize'

export default function GridOverlay() {
	// Only show in dev mode
	if (!import.meta.env.DEV) {
		return null
	}

	const [visible, setVisible] = createSignal(false)
	const [columns, setColumns] = createSignal(1)

	const handleResize = () => {
		const computed = getComputedStyle(document.documentElement)
		const columns = computed.getPropertyValue('--grid-columns')

		setColumns(+columns)
	}

	onMount(() => {
		handleResize()
	})

	useWindowResize(handleResize)

	useKeypress('g', () => {
		setVisible(!visible())
	})

	return (
		<div
			class={cx(
				'pointer-events-none fixed inset-0 z-9999 h-screen w-[var(--screen-width)]',
				visible() ? 'block' : 'hidden',
			)}
		>
			<div class="px-margin-1 gap-gutter-1 grid-contain flex size-full">
				<For each={Array.from({ length: columns() }).fill(null)}>
					{() => <div class="size-full bg-[red]/10" />}
				</For>
			</div>
		</div>
	)
}
