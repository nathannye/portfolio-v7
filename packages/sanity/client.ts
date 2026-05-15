import { createClient } from '@sanity/client'
import { SANITY_CONFIG } from './config'

const token = import.meta.env.SANITY_TOKEN ?? process.env.SANITY_TOKEN

const sanityClient = createClient({
	...SANITY_CONFIG,
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: 'v2026-05-14',
	perspective: process.env.NODE_ENV === 'development' ? 'drafts' : 'published',
	token,
})

export default sanityClient
