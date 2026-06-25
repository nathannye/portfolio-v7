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
	console.log({ ...props })
	return (
		<ListItem index={props.index}>
			<div class="pt-17 lg:pt-10 flex gap-y-5 items-baseline pb-40 lg:pb-20 w-full">
				<div class="w-grid-4 lg:w-grid-3-w lg:pr-gutter-1 shrink-0">
					<h3 data-fade class="heading-5 lg:text-balance">
						{props.title}
					</h3>
					<p class="opacity-50 eyebrow mt-3">{props.packageName}</p>
				</div>
				<div class="w-full lg:flex lg:w-grid-2-w">
					<Show when={props.githubLink}>
						<div class="hover:text-accent lg:w-grid-2-w duration-225 shrink-0 eyebrow">
							<ExternalLink href={props.githubLink} label="GitHub" />
						</div>
					</Show>
					<Show when={props.npmLink}>
						<div class="hover:text-accent lg:w-grid-2-w duration-225 shrink-0 eyebrow">
							<ExternalLink href={props.npmLink} label="npm" />
						</div>
					</Show>
				</div>
			</div>
		</ListItem>
	)
}
