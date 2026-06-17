import { A } from '@solidjs/router'
import { For, Show } from 'solid-js'
import { listItemAnimation } from '~/animations/list-item'
import { formatTime } from '~/utils/time'
import ListItem from './ListItem'

type MarginListItemProps = {
	title: string
	slug: string
	firstPublished: string
}

export default function MarginListItem(props: MarginListItemProps) {
	const list = (items: string[]) =>
		items
			? items
					.sort((a, b) => a.localeCompare(b))
					.map((item) => `#${item}`)
					.join(', ')
			: ''

	return (
		<ListItem use:listItemAnimation index={props.index}>
			<A
				class="pt-17 hover:opacity-50 duration-225 lg:pt-10 flex max-lg:flex-col gap-y-5 items-baseline pb-40 lg:pb-20 w-full"
				href={props.slug.fullUrl}
			>
				<h3
					data-fade
					class="heading-5 lg:text-balance w-grid-4 lg:w-grid-3-w lg:pr-gutter-2 shrink-0"
				>
					{props.title}
				</h3>
				<div data-fade class="opacity-90 lg:w-grid-2-w eyebrow shrink-0 eyebrow">
					{formatTime(props.firstPublished)}
				</div>
				<ul
					data-fade
					class="opacity-50 lg:opacity-90 eyebrow w-grid-3 max-lg:mt-20 max-lg:flex max-lg:gap-x-20 shrink-0 eyebrow"
				>
					<Show when={props?.tags?.length}>
						<For each={props.tags.sort((a, b) => a.localeCompare(b))}>
							{(tag) => (
								<li>
									<span class="opacity-50 lg:inline-block mr-1">#</span>
									{tag}
								</li>
							)}
						</For>
					</Show>
				</ul>
			</A>
		</ListItem>
	)
}
