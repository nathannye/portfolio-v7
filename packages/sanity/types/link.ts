export type SanityLinkBase = {
	url?: string
	linkType: 'internal' | 'external'
	slug: {
		current: string
	}
}

export type SanityLinkProps = {
	label: string
	link: SanityLinkBase
	advanced?: {
		noFollow?: boolean
		noReferrer?: boolean
		newTab?: boolean
	}
}

export type SanityButtonProps = {
	label: string
	variant: 'black' | 'white' | 'black-transparent-arrow'
	link: SanityLinkBase
}
