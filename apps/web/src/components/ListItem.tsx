import type { JSX } from 'solid-js'
import { listItemAnimation } from '~/animations/list-item'

export default function ListItem(props: {
	children: JSX.Element
	index: number
}) {
	return (
		<li
			use:listItemAnimation
			data-index={props.index}
			style={{
				'--scale': 0,
			}}
			class="w-full opacity-0 relative after:origin-left after:scale-x-[var(--scale)] after:absolute after:top-0 after:right-0 after:left-0 afer:w-full after:h-px after:bg-inverted/10"
		>
			{props.children}
		</li>
	)
}
