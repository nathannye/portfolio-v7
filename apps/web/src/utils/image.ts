export const getPriorityAttrs = (isPriority = false) => {
	return {
		fetchpriority: isPriority ? 'high' : 'auto',
		loading: isPriority ? 'eager' : 'lazy',
		decoding: isPriority ? 'sync' : 'async',
	} as unknown as HTMLImageElement['attributes']
}
