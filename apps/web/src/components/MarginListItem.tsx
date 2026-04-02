import { A } from '@solidjs/router'

type MarginListItemProps = {
	title: string
	slug: string
	firstPublished: string
}

export default function MarginListItem(props: MarginListItemProps) {
	const formattedDate = () => {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
		}).format(new Date(props.firstPublished))
	}

	const list = (items: string[]) => (items ? items.join(', ') : '')

	return (
		<li class="w-full border-t border-inverted/10">
			<A
				class="pt-10 lg:pt-8 flex max-lg:flex-col gap-y-5 items-baseline pb-40 lg:pb-20 w-full "
				href={props.slug.fullUrl}
			>
				<h3 class="heading-5 w-grid-3-w pr-gutter-1 shrink-0">{props.title}</h3>
				<div class="opacity-90 w-grid-2-w eyebrow shrink-0 font-[120] max-lg:text-[2rem]">
					{formattedDate()}
				</div>
				<div class="opacity-90 eyebrow w-grid-3 shrink-0 font-[120] max-lg:text-[2rem]">
					{list(props.tags)}
				</div>
			</A>
		</li>
	)
}
