import type { SanityImageAssetDocument } from '@sanity/client'
import type { Asset } from '@sanity/types'
import type { MuxVideo } from './mux'

export type SanityMedia = {
	mediaType: 'image' | 'video'
	image: SanityImageAssetDocument
	video: MuxVideo
}

export type SanityImageProps = {
	/** When missing or without a resolvable asset, a light gray placeholder is shown. */
	src?: SanityImageAssetDocument | null
	mobileWidth?: number | string
	desktopWidth?: number | string
	alt?: string
	priority?: boolean
	class?: string
}
