import { getDocumentByType } from '@local/sanity/server'
import { query } from '@solidjs/router'

export type GlobalSeo = {
	siteTitle?: string
	siteUrl?: string
	twitterHandle?: string
	jobTitle?: string
	metaDescription?: string
	bio?: string
}

const FALLBACKS = {
	siteTitle: 'Nathan Nye',
	jobTitle: 'Frontend Engineer',
	metaDescription:
		'Frontend engineer building everything from award-winning marketing sites to sprawling CMS platforms. Focused on ambitious web projects that need to survive the real world.',
	bio: 'Freelance creative/frontend developer specializing in large-scale CMS builds, e-commerce, and interactive experiences.',
}

export const getGlobalSeo = query(async () => {
	'use server'
	return (await getDocumentByType('seo')) as GlobalSeo | null
}, 'global-seo')

export function resolveSeo(seo?: GlobalSeo | null) {
	const siteTitle = seo?.siteTitle || FALLBACKS.siteTitle
	const jobTitle = seo?.jobTitle || FALLBACKS.jobTitle

	return {
		siteTitle,
		siteUrl: seo?.siteUrl,
		twitterHandle: seo?.twitterHandle,
		jobTitle,
		metaDescription: seo?.metaDescription || FALLBACKS.metaDescription,
		bio: seo?.bio || FALLBACKS.bio,
		pageTitle: `${siteTitle} • ${jobTitle}`,
		websiteName: `${siteTitle} – ${jobTitle}`,
	}
}
