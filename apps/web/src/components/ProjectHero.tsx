import SanityImage from '@local/sanity/components/SanityImage'
import { Show } from 'solid-js'
import ParallaxMedia from './ParallaxMedia'

type ProjectHeroProps = {
	title: string
	stack: string[]
	role: string[]
	year?: number
	partners?: string[]
	liveLink?: string
}

export default function ProjectHero(props: ProjectHeroProps) {
	const list = (items: string[]) => (items ? items.join(', ') : '')

	return (
		<header class="px-margin-1 pb-900">
			<div class="h-[50vh] min-h-500 flex-center flex-col">
				<h1 class="heading-2">{props.title}</h1>
				<p class="heading-5 font-serif opacity-70 mt-12">{props.year}</p>
			</div>

			<dl class="pt-11 [&_dd]:font-[170] [&_dt]:opacity-50 flex items-center pb-8 justify-between border-t border-b border-inverted/10 eyebrow">
				<div class="flex">
					<div class="flex shrink-0 w-grid-2-w">
						<dt class="pr-20">Role</dt>
						<dd>{list(props.role)}</dd>
					</div>
					<div class="flex shrink-0 gap-gutter-1">
						<dt class="w-grid-1">Stack</dt>
						<dd>{list(props.stack)}</dd>
					</div>
				</div>
				<div class="flex justify-between shrink-0 w-grid-5-w">
					<a class="text-accent pl-gutter-1 underline" href={props.liveLink}>
						Live Link
					</a>
					<Show when={props.partners}>
						<div class="flex shrink-0 w-grid-2 gap-gutter-1 ">
							<dt>Partners in crime</dt>
							<dd>{list(props.partners)}</dd>
						</div>
					</Show>
				</div>
			</dl>
			<ParallaxMedia class="mt-margin-1 w-full aspect-[1/.75]">
				<SanityImage
					desktopWidth={95}
					mobileWidth={95}
					src={props.mainImage}
					class="object-cover size-full"
				/>
			</ParallaxMedia>
		</header>
	)
}
