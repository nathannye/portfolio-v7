import SanityImage from '@local/sanity/components/SanityImage'
import cx from 'classix'
import { Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import ParallaxMedia from '~/components/ParallaxMedia'
import { formatPartner } from '~/utils/string'

type ProjectHeroProps = {
	title: string
	stack: string[]
	role: string[]
	year?: number
	partners?: {
		name: string
		link: string
	}[]
	liveLink?: string
}

export default function ProjectHero(props: ProjectHeroProps) {
	const list = (items: string[]) => (items ? items.join(', ') : '')
	const partnerList = (partners: { name: string; link: string }[]) =>
		partners?.length
			? partners.map((partner) => formatPartner(partner)).join(', ')
			: ''

	return (
		<header class="px-margin-1 pb-margin-1">
			<div class="h-[50vh] min-h-500 flex-center flex-col">
				<h1 class="heading-2">{props.title}</h1>
				<p class="heading-5 font-bold font-serif opacity-70 mt-12">{props.year}</p>
			</div>

			<dl class="pt-11 [&_dd]:font-[150] [&_dt]:opacity-50 flex items-center pb-8 justify-between border-t border-b border-inverted/10 eyebrow">
				<div class="flex">
					<dl class="flex shrink-0 w-grid-2-w">
						<dt class="pr-20">Role</dt>
						<dd>{list(props.role)}</dd>
					</dl>
					<dl class="flex shrink-0 gap-gutter-1">
						<dt class="w-grid-1">Stack</dt>
						<dd>{list(props.stack)}</dd>
					</dl>
				</div>
				<div class="flex justify-between shrink-0 w-grid-5-w">
					<dd>
						<Dynamic
							component={props.liveLink ? 'a' : 'div'}
							rel="noopener noreferrer"
							target="_blank"
							class={cx(
								'text-accent pl-gutter-1 underline',
								!props.liveLink && 'invisible',
							)}
							href={props.liveLink}
						>
							<Show when={props.liveLink}>Live Link</Show>
						</Dynamic>
					</dd>
					<Show when={props.partners}>
						<dl class="flex shrink-0 flex justify-end w-grid-4 gap-gutter-1 ">
							<dt>Partners in crime</dt>
							<dd>{partnerList(props.partners)}</dd>
						</dl>
					</Show>
				</div>
			</dl>
			<ParallaxMedia class="mt-margin-1 w-full aspect-[1/1.3] lg:aspect-[1/.75]">
				<SanityImage
					desktopWidth={95}
					priority
					mobileWidth={95}
					src={props.mainImage}
					class="object-cover size-full"
				/>
			</ParallaxMedia>
		</header>
	)
}
