import type { JSX } from 'solid-js'

type ListSectionProps = {
	title: string
	itemCount: number
	children: JSX.Element
}

export default function ListSection(props: ListSectionProps) {
	return (
		<section class="flex items-start px-margin-1 pt-20 border-t border-inverted/30">
			<h2 class="w-grid-3-w eyebrow shrink-0">
				{props.title} <span class="text-accent">{`[ ${props.itemCount} ]`}</span>
			</h2>
			<div class="pr-grid-1-w w-full">{props.children}</div>
		</section>
	)
}
