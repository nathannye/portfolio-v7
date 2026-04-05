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
				<dl class="lg:w-grid-2-w max-lg:justify-between	 max-lg:flex gap-x-20 lg:pt-10 shrink-0">
					<div
						class="mb-30 eyebrow max-lg:pl-9 max-lg:flex"
						aria-label={`Estimated reading time ${props.estimatedReadingTime} minutes`}
					>
						<dt class="mb-5 max-lg:mr-15">Est.</dt>
						<dd class="eyebrow opacity-50">{props.estimatedReadingTime}min</dd>
					</div>

					<div class="eyebrow max-lg:flex max-lg:pl-gutter-1 max-lg:w-grid-3-w gap-x-20">
						<dt class="max-lg:w-grid-1-w">Categories</dt>
						<dd>
							<ul>
								<For each={props.tags}>
									{(tag) => (
										<li class="eyebrow not-last:mb-5 opacity-50">#{tag.name}</li>
									)}
								</For>
							</ul>
						</dd>
					</div>
				</dl>
				<h1 class="heading-2 lg:pr-grid-3-w">{props.title}</h1>
			</div>
		</header>
	)
}
