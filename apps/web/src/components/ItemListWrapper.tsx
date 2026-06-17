import type { JSX } from 'solid-js'

export default function ItemListWrapper(props: { children: JSX.Element }) {
	return (
		<div class="mt-10">
			<ul class="flex flex-col gap-y-30 list-none">{props.children}</ul>
		</div>
	)
}
