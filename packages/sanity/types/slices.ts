/**
 * AI Link and section slice types.
 * Mirrors apps/cms/schemas/ai (aiLink, prompt) and slices/section.
 */

export type AiLinkContext = 'global' | 'agenda' | 'tickets'

export type AiLinkModel = 'model1' | 'model2' | 'model3'

export type AiLinkPrompt = {
	_key: string
	context?: AiLinkContext
	label?: string
	text?: string
}

export type AiLink = {
	prompts?: AiLinkPrompt[]
	model?: AiLinkModel
} | null

/** Section slice as received from Sanity (e.g. in page.slices) */
export type SectionSlice = {
	_type: 'section'
	title: string
	aiLink?: AiLink
	subsections: unknown[]
}
