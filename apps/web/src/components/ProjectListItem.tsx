import { A } from '@solidjs/router'

type ProjectListItemProps = {
	title: string
	year: number
	slug: string
}

export default function ProjectListItem(props: ProjectListItemProps) {
	return (
		<li class="w-full">
			<A
				class="pt-12 block pb-20 w-full not-first:border-t not-first:border-inverted/10"
				href={props.slug.fullUrl}
			>
				<div class="flex items-baseline gap-4">
					<h3 class="heading-5">{props.title}</h3>
					<span class="opacity-50">{props.year}</span>
				</div>
			</A>
		</li>
	)
}
