import { A } from '@solidjs/router'
import { Show } from 'solid-js'

type ProjectNavItem = {
	title: string
	slug: {
		fullUrl: string
		current: string
	}
}

type ProjectNavButtonsProps = {
	previous: ProjectNavItem | null
	next: ProjectNavItem | null
}
export default function ProjectNavButtons(props: ProjectNavButtonsProps) {
	return (
		<section class="px-margin-1">
			<div class="max-lg:!text-[2.5rem] heading-4 mt-90 border-t border-inverted/10 py-30 flex justify-between">
				<Show when={props.previous}>
					{(previous) => (
						<A href={previous().slug.fullUrl}>Previous: {previous().title}</A>
					)}
				</Show>
				<Show when={props.next}>
					{(next) => <A href={next().slug.fullUrl}>Next: {next().title}</A>}
				</Show>
			</div>
		</section>
	)
}
