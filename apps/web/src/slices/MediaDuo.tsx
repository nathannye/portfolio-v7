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
		'1': 'lg:w-grid-1',
		'2': 'lg:w-grid-2',
		'3': 'lg:w-grid-3',
		'4': 'lg:w-grid-4',
		'5': 'lg:w-grid-5',
		'6': 'lg:w-grid-6',
		'7': 'lg:w-grid-7',
		'8': 'lg:w-grid-8',
		'9': 'lg:w-grid-9',
		'10': 'lg:w-grid-10',
		'11': 'lg:w-grid-11',
		'12': 'lg:w-grid-12',
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
			return 0.875
		}

		const num = Number.parseInt(columns, 10)
		return 0.4 + num * 0.05
	}

	return (
		<Slice
			class={cx(
				'flex gap-gutter-1 items-start max-lg:flex-col gap-y-margin-1',
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
							<ParallaxMedia
								class={cx(columnClass, 'w-full')}
								speed={getSpeed(columns)}
							>
								<SanityImage
									class="w-full max-h-[75vh] lg:max-h-[110vh] h-auto object-cover"
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
