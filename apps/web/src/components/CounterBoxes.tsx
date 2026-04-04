import { For } from 'solid-js'

export default function CounterBoxes(props: { count: number }) {
	return (
		<div class="inline-grid max-lg:hidden grid-cols-4 gap-3 mt-53">
			<For each={Array.from({ length: props.count })}>
				{() => <div data-box class="bg-inverted opacity-0 size-3" />}
			</For>
		</div>
	)
}
