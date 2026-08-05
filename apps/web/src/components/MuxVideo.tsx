import cx from 'classix'
import type Hls from 'hls.js'
import { createEffect, onCleanup, onMount } from 'solid-js'
import { onIntersect } from '~/utils'
import { getMuxUrls } from '~/utils/mux'

interface MuxVideoProps {
	src: {
		asset: {
			playbackId: string
		}
	}
	loop?: boolean
	autoplay?: boolean
	class: string
	priority?: boolean
	posterDesktopWidth?: number | string
	posterMobileWidth?: number | string
}

const aspectToCss = (aspect: string) => {
	if (!aspect) return ''
	const [width, height] = aspect.split(':').map(Number)

	return `${width / height}`
}

export default function MuxVideo({
	src,
	priority = false,
	autoplay = true,
	loop = true,
	class: className = '',
	posterDesktopWidth,
	posterMobileWidth,
}: MuxVideoProps) {
	let el!: HTMLVideoElement
	let hlsRef: Hls

	const aspect = aspectToCss(src?.asset?.data?.aspect_ratio)

	const playbackId = src.asset?.playbackId
	const { poster: posterUrl, playbackUrl: url } = getMuxUrls(playbackId)

	const generatePosterAttrs = () => {
		const responsiveWidths = [100, 320, 640, 960, 1200, 1920]
		const srcset = responsiveWidths
			.map(
				(width) =>
					`https://image.mux.com/${playbackId}/thumbnail.webp?time=0&width=${width} ${width}w`,
			)
			.join(', ')

		return {
			sizes: `(max-width:767px) ${posterMobileWidth || 100}vw, ${posterDesktopWidth || 100}vw`,
			srcset,
		}
	}

	createEffect(async () => {
		if (!el || !playbackId) return

		const { default: HlsLib } = await import('hls.js')
		if (!HlsLib.isSupported()) return

		const hls = new HlsLib()
		hls.loadSource(url)
		hls.attachMedia(el)
		hlsRef = hls
	})

	onCleanup(() => {
		if (hlsRef) {
			hlsRef.destroy()
		}
	})

	onMount(() => {
		onIntersect(el, {
			onEnter: () => {
				if (el) {
					el.play()
				}
			},
			onLeave: () => {
				if (el) {
					el.pause()
				}
			},
		})
	})

	return (
		<div
			style={{
				'--aspect': aspect,
			}}
			class={cx('relative w-full aspect-[var(--aspect)]')}
		>
			<div class={cx('relative', className)}>
				<img
					src={posterUrl}
					alt="Video Poster"
					loading={priority ? 'eager' : 'lazy'}
					fetchpriority={priority ? 'high' : 'auto'}
					decoding={priority ? 'sync' : 'async'}
					{...generatePosterAttrs()}
					class="absolute inset-0 size-full z-1 object-cover"
				/>

				<video
					ref={el}
					controls={false}
					autoplay={autoplay}
					muted={true}
					class="z-2 w-full h-full relative object-cover"
					playsinline={false}
					loop={loop}
				/>
			</div>
		</div>
	)
}
