import { A } from '@solidjs/router'

type MarginListItemProps = {
	title: string
	slug: string
	firstPublished: string
}

export default function MarginListItem(props: MarginListItemProps) {
	return (
		<li class="w-full border-t border-inverted/10">
			<A
				class="pt-10 lg:pt-8 flex max-lg:flex-col gap-y-5 items-baseline pb-40 lg:pb-20 w-full "
				href={props.slug.fullUrl}
			>
				<h3 class="heading-5">{props.title}</h3>
			</A>
		</li>
	)
}
