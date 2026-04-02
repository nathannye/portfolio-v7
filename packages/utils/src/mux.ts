export const getMuxUrls = (playbackId: string) => {
	return {
		poster: `https://image.mux.com/${playbackId}/thumbnail.webp?time=0`,
		playbackUrl: `https://stream.mux.com/${playbackId}.m3u8`,
	}
}
