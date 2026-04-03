import type { MuxVideo as MuxVideoType } from '@local/sanity'
import SanityImage from '@local/sanity/components/SanityImage'
import type { SanityImageAssetDocument } from '@sanity/client'
import cx from 'classix'
import { For } from 'solid-js'
import MuxVideo from '~/components/MuxVideo'
import ParallaxMedia from '~/components/ParallaxMedia'
import Slice from '~/components/Slice'

interface MediaDuoProps {
	media: {
		mediaType: 'image' | 'video'
		image: SanityImageAssetDocument
		video: MuxVideoType
		columns: string
	}[]
}

export default function MediaDuo(props: MediaDuoProps) {
	const columnMap = {
		'1': 'w-grid-1',
		'2': 'w-grid-2',
		'3': 'w-grid-3',
		'4': 'w-grid-4',
		'5': 'w-grid-5',
		'6': 'w-grid-6',
		'7': 'w-grid-7',
		'8': 'w-grid-8',
		'9': 'w-grid-9',
		'10': 'w-grid-10',
		'11': 'w-grid-11',
		'12': 'w-grid-12',
		full: 'w-full',
	}

	const getWidthAttrs = (columns: string) => {
		let desktopWidth = 95
		let mobileWidth = 95

		if (columns !== 'full') {
			const num = Number.parseInt(columns, 10)
			desktopWidth = Math.round((14 / num) * 100)
			mobileWidth = Math.round((5 / num) * 100)
		}

		return {
			desktopWidth,
			mobileWidth,
		}
	}

	const getSpeed = (columns: string) => {
		if (columns === 'full') {
			return 0.7
		}

		const num = Number.parseInt(columns, 10)
		return 0.4 + num * 0.1
	}

	return (
		<Slice
			class={cx(
				'flex gap-gutter-1 items-start max-lg:flex-col gap-y-20',
				props.media.length === 1 ? 'justify-center' : 'justify-between',
			)}
		>
			<For each={props.media}>
				{(item) => {
					const { media, columns } = item
					const columnClass = columnMap?.[columns] || 'w-full'

					const { desktopWidth, mobileWidth } = getWidthAttrs(columns)

					if (media.mediaType === 'image') {
						return (
							<ParallaxMedia class={columnClass} speed={getSpeed(columns)}>
								<SanityImage
									class="w-full max-h-[80vh] h-auto object-cover"
									desktopWidth={desktopWidth}
									mobileWidth={mobileWidth}
									src={media.image}
								/>
							</ParallaxMedia>
						)
					}
					if (media.mediaType === 'video') {
						return (
							<div class={columnClass}>
								<MuxVideo
									posterDesktopWidth={desktopWidth}
									posterMobileWidth={mobileWidth}
									src={media.video}
								/>
							</div>
						)
					}
				}}
			</For>
		</Slice>
	)
}
