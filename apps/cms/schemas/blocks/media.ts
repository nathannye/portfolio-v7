import { MdImage, MdPlayCircle } from 'react-icons/md'
import MediaSelector from '../../components/MediaSelector'

export default {
	name: 'media',
	components: {
		input: MediaSelector,
	},
	preview: {
		select: {
			mediaType: 'mediaType',
			image: 'image',
			videoAssetId: 'video.asset._ref',
		},
		prepare({ mediaType, image, videoAssetId }) {
			const isVideo = mediaType === 'video'
			return {
				title: isVideo ? 'Video' : 'Image',
				subtitle: isVideo
					? videoAssetId
						? `Mux: ${videoAssetId.replace('mux-video-asset-', '')}`
						: 'No video uploaded'
					: image
						? undefined
						: 'No image selected',
				media: !isVideo && image ? image : isVideo ? MdPlayCircle : MdImage,
			}
		},
	},
	type: 'object',
	fields: [
		{
			name: 'mediaType',
			initialValue: 'image',
			type: 'string',
			options: {
				list: ['image', 'video'],
			},
		},
		{
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'video',
			type: 'mux.video',
			options: {
				collapsable: false,
				collapsed: false,
			},
		},
	],
}
