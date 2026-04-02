import cx from 'classix'
import type { SanityImageProps } from '../types'
import { urlFor } from '../utils/assets'

function imagePlaceholder(
	className: string | undefined,
	alt: string | undefined,
) {
	return <div class={cx(className, 'bg-pale-white box-border')} />
}

export default function SanityImage({
	src,
	mobileWidth,
	desktopWidth,
	alt,
	priority,
	class: className,
}: SanityImageProps) {
	if (!src?.asset) {
		return imagePlaceholder(className, alt)
	}

	const IS_RICH_IMAGE = typeof src?.asset?.url === 'string' // means it has been de-referenced

	const base = IS_RICH_IMAGE ? src.asset : src?.asset || src

	const quality = 77
	const altText = src?.asset?.altText || alt || ''

	let assetType: string
	let assetId: string
	let imageRes: string
	let fileType: string
	let imageWidth: number
	let imageHeight: number

	if (IS_RICH_IMAGE) {
		const dims = src.asset.metadata?.dimensions
		if (!dims?.width || !dims?.height) {
			return imagePlaceholder(className, alt)
		}

		assetType = src.asset.assetType
		assetId = src.asset.assetId
		imageRes = src.asset.imageRes
		fileType = src.asset.fileType

		imageWidth = dims.width
		imageHeight = dims.height
	} else {
		const [_assetType, _assetId, _imageRes, _fileType] =
			base?._ref?.split('-') || []

		if (!_assetType || !_assetId || !_imageRes || !_fileType) {
			return imagePlaceholder(className, alt)
		}

		const [w, h] = _imageRes.split('x').map((x) => Number.parseInt(x))

		imageWidth = w
		imageHeight = h

		assetType = _assetType as string
		assetId = _assetId as string
		imageRes = _imageRes as string
		fileType = _fileType as string
	}

	const aspectRatio = imageWidth / imageHeight
	if (!Number.isFinite(aspectRatio) || aspectRatio <= 0) {
		return imagePlaceholder(className, alt)
	}

	const crop = base?.crop

	const w = Math.ceil(
		crop ? (1 - crop.left - crop.right) * imageWidth : imageWidth,
	)
	const h = Math.ceil(
		crop ? (1 - crop.top - crop.bottom) * imageHeight : imageHeight,
	)

	// viewport widths that image sizes attribute will use
	const responsiveWidths = [20, 50, 100, 320, 640, 960, 1200, 1920, 2160]

	const imageUrl = () => {
		if (!IS_RICH_IMAGE && !base._ref) return null
		const property = IS_RICH_IMAGE ? base._id : base._ref
		if (!property) return null

		const url = urlFor(property)
			.size(w | 0, (w / aspectRatio) | 0)
			.fit('crop')
			.auto('format')
			.quality(quality)
			.url()

		return url
	}

	const sizeLoader = () => {
		let sizes = ''
		const property = IS_RICH_IMAGE ? base._id : base._ref
		if (!property) return ''
		responsiveWidths.forEach((width, index) => {
			const w = width | 0
			const h = (width / aspectRatio) | 0

			const url = urlFor(property)
				.size(w, h)
				.fit('crop')
				.auto('format')
				.quality(quality)

				.url()

			const string = `${url} ${width}w${
				index + 1 === responsiveWidths.length ? '' : ', '
			}`
			sizes += string
		})
		return sizes
	}

	const resolvedUrl = imageUrl()
	if (!resolvedUrl) {
		return imagePlaceholder(className, alt)
	}

	return (
		<img
			src={resolvedUrl}
			width={Math.ceil(w)}
			alt={altText}
			height={Math.ceil(h)}
			class={className}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding={priority ? 'sync' : 'async'}
			srcset={sizeLoader()}
			draggable={false}
			sizes={
				assetType === 'svg'
					? '100vw'
					: `(max-width:767px) ${mobileWidth || 70}vw, ${desktopWidth || 100}vw`
			}
		/>
	)
}
