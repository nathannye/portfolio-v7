import { A } from '@solidjs/router'
import { For, Show } from 'solid-js'
import { listItemAnimation } from '~/animations/list-item'

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
		<li
			use:listItemAnimation
			data-index={props.index}
			style={{
				'--scale': 0,
			}}
			class="w-full opacity-0 relative after:origin-left after:scale-x-[var(--scale)] after:absolute after:top-0 after:right-0 after:left-0 afer:w-full after:h-px after:bg-inverted/10"
		>
			<div class="pt-17  lg:pt-8 flex gap-y-5 items-baseline pb-40 lg:pb-20 w-full">
				<h3
					data-fade
					class="heading-5 lg:text-balance w-grid-2 lg:w-grid-3-w lg:pr-gutter-2 shrink-0"
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
				<ul
					data-fade
					class="opacity-50 lg:opacity-90 eyebrow w-grid-3 max-lg:mt-20 max-lg:flex max-lg:gap-x-20 shrink-0 font-[120] max-lg:text-[2rem]"
				>
					<Show when={props?.tags?.length}>
						<For each={props.tags.sort((a, b) => a.localeCompare(b))}>
							{(tag) => (
								<li>
									<span class="opacity-40 lg:inline-block mr-2">#</span>
									{tag}
								</li>
							)}
						</For>
					</Show>
				</ul>
			</div>
		</li>
	)
}
