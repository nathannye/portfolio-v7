import type { JSX } from 'solid-js'
import BracketedText from './BracketedText'

type ListSectionProps = {
	title: string
	itemCount: number
	children: JSX.Element
}

export default function ListSection(props: ListSectionProps) {
	return (
		<section class="px-margin-1">
			<div class="flex items-start pt-2 border-t border-inverted/30 flex-col lg:flex-row gap-y-40">
				<h2 class="w-grid-3-w font-[160] mt-9 eyebrow shrink-0">
					<span class="inline-block">{props.title}</span>

					<BracketedText class="ml-15">{props.itemCount}</BracketedText>
				</h2>
				<div class="w-full">{props.children}</div>
			</div>
		</section>
	)
}
