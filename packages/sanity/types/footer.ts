/**
 * TypeScript types for Sanity Footer data structure
 * Based on the settings.footer schema
 */

/**
 * Advanced link options for SEO and behavior control
 */
export type SanityLinkAdvanced = {
	noFollow?: boolean
	noReferrer?: boolean
	newTab?: boolean
}

/**
 * Internal link reference (when linkType is 'internal')
 */
export type SanityInternalLinkReference = {
	_type: 'reference'
	_ref: string
	_key?: string
}

/**
 * Sanity link object - can be internal or external
 */
export type SanityLink = {
	linkType: 'internal' | 'external'
	label?: string
	// For external links
	url?: string
	// For internal links
	page?: SanityInternalLinkReference
	// Resolved slug (after link resolution)
	slug?: {
		current: string
	}
	// Advanced options
	advanced?: SanityLinkAdvanced
	_key?: string
}

/**
 * Link with label - used in footer link groups and legal links
 */
export type SanityLinkWithLabel = {
	label: string
	link: SanityLink
	_key?: string
}

/**
 * Link group - contains a label and an array of links
 */
export type SanityLinkGroup = {
	label: string
	links: SanityLinkWithLabel[]
	_key?: string
}

/**
 * Additional links that can be conditionally displayed
 * based on page context (events, resources, etc.)
 */
export type SanityFooterAdditionalLinks = {
	events?: SanityLinkGroup[]
	resources?: SanityLinkGroup[]
}

/**
 * Footer settings document type
 * This is the complete structure returned from getDocumentByType('settings.footer')
 */
export type SanityFooter = {
	_type: 'settings.footer'
	_id: string
	_createdAt?: string
	_updatedAt?: string
	_rev?: string
	// Footer address text
	address?: string
	// Left column links
	leftLinks?: SanityLinkGroup[]
	// Right column links
	rightLinks?: SanityLinkGroup[]
	// Additional contextual links
	additionalLinks?: SanityFooterAdditionalLinks
	// Legal/privacy links
	legalLinks?: SanityLinkWithLabel[]
}
