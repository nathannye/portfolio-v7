import { sanityImageToUrl } from '@local/sanity'
import type { SanityImageAssetDocument } from '@sanity/client'
import { A } from '@solidjs/router'
import cx from 'classix'
import { For, onMount } from 'solid-js'
import { listItemAnimation } from '~/animations/list-item'
import ProjectImageFlipper from '~/gl/actors/project-image-flipper/ProjectImageFlipper'
import { useWebglNode } from '~/hooks/useWebglNode'
import { setProjectCursor } from '~/stores/projectCursorStore'
import { formatPartner } from '~/utils/string'

type ProjectListItemProps = {
	title: string
	year: number
	slug: string
	index: number
	mainImage: SanityImageAssetDocument
}

export default function ProjectListItem(props: ProjectListItemProps) {
	const list = (items: string[]) => (items ? items.join(', ') : '')
	const imageUrl = sanityImageToUrl(props.mainImage, 1000)
	setProjectCursor('images', props.index, imageUrl)

	const partnerList = (partners: string[]) =>
		partners ? partners.map((partner) => formatPartner(partner)).join(', ') : ''

	const handleMouseEnter = () => {
		setProjectCursor('index', props.index)
	}

	const { setRef } = useWebglNode(ProjectImageFlipper)

	return (
		<li
			use:listItemAnimation
			data-index={props.index}
			style={{
				'--scale': 0,
			}}
			class="w-full opacity-0 relative after:origin-left after:scale-x-[var(--scale)] after:absolute after:top-0 after:right-0 after:left-0 afer:w-full after:h-px after:bg-inverted/10"
		>
			<div
				data-wrapper
				class="pt-17 flex max-lg:flex-col gap-y-5 items-baseline pb-40 lg:pb-20 w-full "
			>
				<div class="w-full lg:w-grid-3-w">
					<A
						ref={setRef}
						href={props.slug.fullUrl}
						class="relative inline-flex hover:opacity-50 duration-225 shrink-0 pointer-events-auto items-start lg:gap-20"
						onMouseEnter={handleMouseEnter}
						data-gl-image={imageUrl}
						data-index={props.index}
					>
						<div class="flex gap-12 pointer-events-none items-baseline">
							<h3 data-fade class="heading-5">
								{props.title}
							</h3>
							<span data-fade class="opacity-50 font-[120] max-lg:text-[2rem]">
								{props.year}
							</span>
						</div>
					</A>
				</div>
				<div class="flex">
					<div
						data-fade
						class={cx(
							'w-grid-3-w lg:w-grid-2-w shrink-0 opacity-90 eyebrow',
							!props.partners?.length && 'invisible max-lg:hidden',
						)}
					>
						<span class="inline-block opacity-50 mr-10 lg:hidden">W/</span>
						{partnerList(props.partners)}
					</div>
					<div data-stagger class="w-grid-2-w shrink-0 opacity-90 eyebrow">
						{list(props.awards)}
					</div>
					<div class="w-full opacity-90 max-lg:hidden eyebrow flex">
						<For each={props.press}>
							{(press, i) => {
								const isLast = i() === props.press.length - 1
								return (
									<a
										data-stagger
										class="underline hover:text-accent duration-225"
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
