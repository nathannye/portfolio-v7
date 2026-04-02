import type { JSX } from 'solid-js'
import BracketedText from './BracketedText'

type ListSectionProps = {
	title: string
	itemCount: number
	children: JSX.Element
}

export default function ListSection(props: ListSectionProps) {
	return (
		<section class="flex items-start px-margin-1 pt-20 border-t border-inverted/30">
			<h2 class="w-grid-3-w font-[190] mt-12 eyebrow shrink-0">
				<span class="inline-block">{props.title}</span>

				<BracketedText class="ml-15">{props.itemCount}</BracketedText>
			</h2>
			<div class="pr-grid-1-w w-full">{props.children}</div>
		</section>
	)
}
