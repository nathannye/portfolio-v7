import type { JSX } from 'solid-js'

export default function ItemListWrapper(props: { children: JSX.Element }) {
	return (
		<div class="mt-10">
			<ul class="flex flex-col gap-y-15 lg:gap-y-14 list-none">
				{props.children}
			</ul>
		</div>
	)
}
