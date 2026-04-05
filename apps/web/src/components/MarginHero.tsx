import { For } from 'solid-js'
import { marginHeroAnimation } from '~/animations/project-hero'

type MarginHeroProps = {
	title: string
	firstPublished: string
	estimatedReadingTime: number
	tags: { name: string }[]
}

export default function MarginHero(props: MarginHeroProps) {
	return (
		<header use:marginHeroAnimation class="px-margin-1 pt-[30vh] pb-[15vh]">
			<div class="flex max-lg:flex-col-reverse gap-y-40">
				<div class="lg:w-grid-2-w max-lg:justify-between	 max-lg:flex gap-x-20 lg:pt-10 shrink-0">
					<dl
						class="mb-30 eyebrow max-lg:pl-9 max-lg:flex"
						aria-label={`Estimated reading time ${props.estimatedReadingTime} minutes`}
					>
						<dt class="mb-5 max-lg:mr-15">Est. time</dt>
						<dd class="eyebrow opacity-50">{props.estimatedReadingTime || 1} min</dd>
					</dl>

					<dl class="eyebrow max-lg:flex max-lg:pl-gutter-1 max-lg:w-grid-3-w gap-x-20">
						<dt class="max-lg:w-grid-1-w mb-6">Categories</dt>
						<dd>
							<ul>
								<For each={props.tags}>
									{(tag) => <li class="eyebrow opacity-50">#{tag.name}</li>}
								</For>
							</ul>
						</dd>
					</dl>
				</div>
				<h1 class="heading-2 lg:pr-grid-3-w">{props.title}</h1>
			</div>
		</header>
	)
}
