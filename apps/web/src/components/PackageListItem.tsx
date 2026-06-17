import { A } from '@solidjs/router'
import { For, Show } from 'solid-js'
import { listItemAnimation } from '~/animations/list-item'
import ListItem from './ListItem'

type PackageListItemProps = {
	title: string
	githubLink: string
	npmLink: string
	description: string
}

const ExternalLink = (props: { href: string; label: string }) => {
	return (
		<A href={props.href} target="_blank" rel="noopener noreferrer">
			{props.label}{' '}
			<span class="inline-block translate-y-1 translate-x-2"> ↗ </span>
		</A>
	)
}

export default function PackageListItem(props: PackageListItemProps) {
	return (
		<ListItem index={props.index}>
			<div class="pt-17 lg:pt-10 flex gap-y-5 items-baseline pb-40 lg:pb-20 w-full">
				<h3
					data-fade
					class="heading-5 lg:text-balance w-grid-3 lg:w-grid-3-w lg:pr-gutter-2 shrink-0"
				>
					{props.title}
				</h3>
				<Show when={props.githubLink}>
					<div class="w-grid-1-w lg:w-grid-2-w hover:opacity-50 duration-225 shrink-0 eyebrow">
						<ExternalLink href={props.githubLink} label="GitHub" />
					</div>
				</Show>
				<Show when={props.npmLink}>
					<div class="w-grid-1-w lg:w-grid-2-w hover:opacity-50 duration-225 shrink-0 eyebrow">
						<ExternalLink href={props.npmLink} label="npm" />
					</div>
				</Show>
			</div>
		</ListItem>
	)
}
