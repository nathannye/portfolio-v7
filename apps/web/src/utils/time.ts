export const formatTime = (d: string) => {
	if (!d?.length) return ''

	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
	}).format(new Date(d))
}
