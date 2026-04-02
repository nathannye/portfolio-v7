export type MuxVideo = {
	_id: string
	_type: 'mux.videoAsset'
	assetId: string
	filename: string
	status: string
	playbackId: string
	thumbTime: number
	data: {
		video_quality: string
		max_resolution_tier: string
		aspect_ratio: string
		created_at: string
		duration: number
		status: string
		master_access: string
		max_stored_frame_rate: number
		playback_ids: Array<{
			id: string
			policy: string
		}>
		resolution_tier: string
		ingest_type: string
		max_stored_resolution: string
		tracks: Array<
			| {
					max_channel_layout: string
					max_channels: number
					id: string
					type: 'audio'
					primary: boolean
					duration: number
			  }
			| {
					max_frame_rate: number
					max_height: number
					id: string
					type: 'video'
					duration: number
					max_width: number
			  }
		>
		id: string
		mp4_support: string
	}
}
