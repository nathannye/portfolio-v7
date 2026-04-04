import { A } from '@solidjs/router'
import { listItemAnimation } from '~/animations/list-item'

type MarginListItemProps = {
	title: string
	slug: string
	firstPublished: string
}

export default function MarginListItem(props: MarginListItemProps) {
	const formattedDate = () => {
		if (!props.firstPublished) return ''
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
		}).format(new Date(props.firstPublished))
	}

	const list = (items: string[]) => (items ? items.join(', ') : '')

	return (
		<li
			use:listItemAnimation
			data-index={props.index}
			style={{
				'--scale': 0,
			}}
			class="w-full opacity-0 relative after:origin-left after:scale-x-[var(--scale)] after:absolute after:top-0 after:right-0 after:left-0 afer:w-full after:h-px after:bg-inverted/10"
		>
			<A
				class="pt-10 lg:pt-8 flex max-lg:flex-col gap-y-5 items-baseline pb-40 lg:pb-20 w-full"
				href={props.slug.fullUrl}
			>
				<h3 data-stagger class="heading-5 lg:w-grid-3-w lg:pr-gutter-2 shrink-0">
					{props.title}
				</h3>
				<div
					data-stagger
					class="opacity-90 lg:w-grid-2-w eyebrow shrink-0 font-[120] max-lg:text-[2rem]"
				>
					{formattedDate()}
				</div>
				<div
					data-stagger
					class="opacity-90 eyebrow w-grid-3 shrink-0 font-[120] max-lg:text-[2rem]"
				>
					{list(props.tags)}
				</div>
			</A>
		</li>
	)
}
