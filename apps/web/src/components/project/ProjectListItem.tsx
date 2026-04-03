import { A } from '@solidjs/router'
import { For } from 'solid-js'
import { formatPartner } from '~/utils/string'

type ProjectListItemProps = {
	title: string
	year: number
	slug: string
}

export default function ProjectListItem(props: ProjectListItemProps) {
	const list = (items: string[]) => (items ? items.join(', ') : '')

	const partnerList = (partners) =>
		partners ? partners.map((partner) => formatPartner(partner)).join(', ') : ''

	return (
		<li class="w-full border-t border-inverted/10">
			<div class="pt-10 lg:pt-8 flex max-lg:flex-col gap-y-5 items-baseline pb-40 lg:pb-20 w-full ">
				<div class="w-grid-3-w">
					<A
						href={props.slug.fullUrl}
						class="inline-flex shrink-0 items-baseline gap-8"
					>
						<h3 class="heading-5">{props.title}</h3>
						<span class="opacity-50 font-[120] max-lg:text-[2rem]">{props.year}</span>
					</A>
				</div>
				<div class="flex">
					<div class="w-grid-2-w shrink-0 opacity-90 eyebrow">
						{partnerList(props.partners)}
					</div>
					<div class="w-grid-2-w shrink-0 opacity-90 eyebrow">
						{list(props.awards)}
					</div>
					<div class="w-full opacity-90 max-lg:hidden eyebrow flex">
						<For each={props.press}>
							{(press, i) => {
								const isLast = i() === props.press.length - 1
								return (
									<a
										class="underline"
										target="_blank"
										rel="noopener noreferrer"
										href={press.url}
									>
										{press.label}
										{!isLast && ', '}
									</a>
								)
							}}
						</For>
					</div>
				</div>
			</div>
		</li>
	)
}
