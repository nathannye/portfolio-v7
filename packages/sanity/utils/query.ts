import sanityClient from '../client'
import { resolveLinks } from './resolver'

type SanityDocumentGetterOptions = {
	filter?: string | null
	extraQuery?: string | null
	params?: {
		[key: string]: any
	}
}

export const getDocumentRaw = async (
	query: string,
	params?: {
		[key: string]: any
	},
) => {
	return await sanityClient.fetch(query, params)
}

export const getDocumentBySlug = (
	documentType: string,
	slug: string,
	options?: SanityDocumentGetterOptions,
) => {
	const { filter = '', extraQuery = '[0]{...}', params = {} } = options || {}
	const q = `*[_type == "${documentType}" && slug.current == "${slug}"${filter}]${extraQuery}`

	const getter = async () => {
		const data = await sanityClient.fetch(q, params)

		await resolveLinks(data)

		return data
	}

	return getter()
}

export const getDocumentByType = (
	documentType: string,
	options?: SanityDocumentGetterOptions,
) => {
	const { filter = '', extraQuery = '[0]{...}', params = {} } = options || {}
	const q = `*[_type == "${documentType}"${filter}]${extraQuery}`

	const getter = async () => {
		const data = await sanityClient.fetch(q, params)

		await resolveLinks(data)

		return data
	}

	return getter()
}
