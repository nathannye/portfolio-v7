import type { MuxVideo as MuxVideoType } from '@local/sanity'
import SanityImage from '@local/sanity/components/SanityImage'
import type { SanityImageAssetDocument } from '@sanity/client'
import { For } from 'solid-js'
import MuxVideo from '~/components/MuxVideo'
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
		full: 'w-full',
	}

	return (
		<Slice class="flex gap-gutter-1 justify-between">
			<For each={props.media}>
				{(item) => {
					const { media, columns } = item
					const columnClass = columnMap?.[columns] || 'w-full'

					if (media.mediaType === 'image') {
						return (
							<div class={columnClass}>
								<SanityImage src={item.media.image} />
							</div>
						)
					}
					if (media.mediaType === 'video') {
						return (
							<div class={columnClass}>
								<MuxVideo src={media.video} />
							</div>
						)
					}
				}}
			</For>
		</Slice>
	)
}
