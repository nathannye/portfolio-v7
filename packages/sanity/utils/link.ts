const buildRel = (noFollow?: boolean, noReferrer?: boolean) => {
	const parts = []
	if (noFollow) {
		parts.push('nofollow')
	}
	if (noReferrer) {
		parts.push('noreferrer')
	}
	return parts.length > 0 ? parts.join(' ') : undefined
}

export const sanityLink = (props: {
	linkType: 'internal' | 'external'
	url?: string
	page?: {
		slug: {
			current: string
			fullUrl: string
		}
	}
	advanced: {
		noFollow?: boolean
		noReferrer?: boolean
		newTab?: boolean
	}
}) => {
	const { linkType, url, page, advanced } = props || {}
	const advancedOptions = advanced || {}

	const isExternal = linkType === 'external'

	return {
		url: isExternal ? url : page?.slug?.current,
		linkType,
		attrs: {
			target: isExternal ? '_blank' : undefined,
			rel: isExternal
				? buildRel(advancedOptions?.noFollow, advancedOptions?.noReferrer)
				: undefined,
			href: isExternal ? url : page?.slug?.fullUrl,
		},
	}
}
