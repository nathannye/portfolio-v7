import { A } from '@solidjs/router'
import { For } from 'solid-js'

type ProjectListItemProps = {
	title: string
	year: number
	slug: string
}

export default function ProjectListItem(props: ProjectListItemProps) {
	const list = (items: string[]) => (items ? items.join(', ') : '')

	return (
		<li class="w-full border-t border-inverted/10">
			<A class="pt-12 flex pb-20 w-full " href={props.slug.fullUrl}>
				<div class="flex items-baseline gap-8 w-grid-3-w">
					<h3 class="heading-5">{props.title}</h3>
					<span class="opacity-50 font-[120]">{props.year}</span>
				</div>
				<div class="w-grid-2-w eyebrow">{list(props.partners)}</div>
				<div class="w-grid-2-w eyebrow">{list(props.awards)}</div>
				<div class="w-grid-2-w eyebrow flex">
					<For each={props.press}>
						{(press, i) => {
							const isLast = i() === props.press.length - 1
							return (
								<a class="underline" href={press.url}>
									{press.label}
									{!isLast && ', '}
								</a>
							)
						}}
					</For>
				</div>
			</A>
		</li>
	)
}
