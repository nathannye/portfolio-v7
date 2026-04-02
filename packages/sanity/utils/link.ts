import type { SanityLinkProps } from '../types'

export const sanityLink = (props: SanityLinkProps) => {
	const { label, link, advanced } = props || {}
	const advancedOptions = advanced || link?.advanced || {}

	const isExternal = link?.linkType === 'external'
	const newTab = advancedOptions?.newTab

	let rel = undefined as string | undefined
	if (isExternal) {
		let parts = ['noopener']
		if (advancedOptions?.noFollow) {
			parts.push('nofollow')
		}
		if (advancedOptions?.noReferrer) {
			parts.push('noreferrer')
		}
		rel = parts.length > 0 ? parts.join(' ') : undefined
	}

	return {
		label,
		isExternal,
		url: isExternal ? link.url : undefined,
		attrs: {
			target: newTab ? '_blank' : undefined,
			rel,
			href: isExternal ? link?.url : link?.slug?.current,
		},
	}
}
