import { createClient } from '@sanity/client'
import { SANITY_CONFIG } from './config'

const sanityClient = createClient({
	...SANITY_CONFIG,
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2026-01-21',
	perspective: 'published',
})

export default sanityClient
