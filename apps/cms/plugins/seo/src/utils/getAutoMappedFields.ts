import type { SchemaMarkupType } from '../types'

export interface AutoMappedField {
	field: string
	source: string
	enabled: boolean
	description: string
}

/**
 * Determines which fields are automatically filled in for a given schema type
 * based on autoMap settings and type-specific behavior
 */
export function getAutoMappedFields(
	schemaType: SchemaMarkupType | undefined,
	autoMap?: {
		title?: boolean
		description?: boolean
		dates?: boolean
	},
): AutoMappedField[] {
	if (!schemaType) {
		return []
	}

	const fields: AutoMappedField[] = []
	const titleEnabled = autoMap?.title !== false
	const descriptionEnabled = autoMap?.description !== false
	const datesEnabled = autoMap?.dates !== false

	// Title/Name mapping
	if (schemaType === 'Article') {
		fields.push({
			field: 'headline',
			source: 'pageMetadata.title',
			enabled: titleEnabled,
			description: 'Automatically mapped from page title',
		})
	} else {
		fields.push({
			field: 'name',
			source: 'pageMetadata.title',
			enabled: titleEnabled,
			description: 'Automatically mapped from page title',
		})
	}

	// Description mapping
	const hasDescription = [
		'WebPage',
		'Product',
		'Event',
		'FAQPage',
		'AboutPage',
		'ContactPage',
		'ProfilePage',
	].includes(schemaType)

	if (hasDescription) {
		fields.push({
			field: 'description',
			source: 'pageMetadata.description',
			enabled: descriptionEnabled,
			description: 'Automatically mapped from page description',
		})
	}

	// Date fields (for types that support them)
	const dateTypes = [
		'Article',
		'WebPage',
		'AboutPage',
		'ContactPage',
		'ProfilePage',
	]

	if (dateTypes.includes(schemaType)) {
		fields.push({
			field: 'datePublished',
			source: 'pageData._createdAt',
			enabled: datesEnabled,
			description: 'Automatically mapped from document creation date',
		})
		fields.push({
			field: 'dateModified',
			source: 'pageData._updatedAt',
			enabled: datesEnabled,
			description: 'Automatically mapped from document update date',
		})
	}

	// URL field (always auto-generated for all types)
	fields.push({
		field: 'url',
		source: 'getPageUrl utility',
		enabled: true,
		description:
			'Automatically generated from canonicalUrl, extra.url, or constructed from slug + siteUrl',
	})

	// isPartOf (WebSite reference) - always auto-generated for applicable types
	const hasIsPartOf = [
		'Article',
		'Product',
		'Event',
		'FAQPage',
		'WebPage',
		'AboutPage',
		'ContactPage',
		'ProfilePage',
	].includes(schemaType)

	if (hasIsPartOf) {
		fields.push({
			field: 'isPartOf',
			source: 'Global WebSite schema',
			enabled: true,
			description: 'Automatically references the global WebSite schema',
		})
	}

	// Type-specific auto-generated fields
	if (schemaType === 'Article' || schemaType === 'WebPage') {
		fields.push({
			field: 'BreadcrumbList',
			source: 'Frontend URL path',
			enabled: true,
			description:
				'Automatically generated breadcrumb schema from the current URL path',
		})
	}

	// Publisher for Article (from defaults if not provided)
	if (schemaType === 'Article') {
		fields.push({
			field: 'publisher',
			source: 'schemaDefaults (if not provided)',
			enabled: true,
			description:
				'Falls back to default publisher or organization from schema defaults',
		})
	}

	return fields
}
