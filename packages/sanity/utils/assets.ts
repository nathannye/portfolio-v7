import {
	createImageUrlBuilder,
	type SanityImageSource,
} from '@sanity/image-url'
import sanityClient from '../client'

export const urlFor = (url: string) => {
	if (!url) return null
	return createImageUrlBuilder(sanityClient).image(url)
}

/** Builds a CDN URL for any Sanity image object (or returns null). Used for WebGL textures, etc. */
export function sanityImageToUrl(
	source: unknown,
	width: number,
): string | null {
	if (!source || typeof source !== 'object') return null
	const asset = (source as { asset?: { url?: string } }).asset
	if (
		asset?.url &&
		typeof asset.url === 'string' &&
		asset.url.startsWith('http')
	) {
		const base = asset.url.split('?')[0]
		return `${base}?auto=format&w=${width}`
	}
	try {
		return createImageUrlBuilder(sanityClient)
			.image(source as SanityImageSource)
			.width(width)
			.auto('format')
			.url()
	} catch {
		return null
	}
}
