import { deepCopy, WalkBuilder } from 'walkjs'
import sanityClient from '../client'

const leadingSlash = (str: string) => {
	if (!str || typeof str !== 'string') return str
	return str?.startsWith('/') ? str : `/${str}`
}

export const resolveLinks = async (inputData: any, maxDepth = 8) => {
	// Use fullSlug if it exists, otherwise keep slug.current as is
	if (inputData?.slug?.current) {
		if (inputData.fullSlug) {
			inputData.slug.current = inputData.fullSlug
		}
	}

	const store = new Map()

	const replaceNode = (node: any, id: string) => {
		const doc = store.get(id)
		if (node.key === 'canonicalUrl') {
			// Resolved page doc has fullSlug at root (or slug.current after resolver normalizes).
			// Set canonicalUrl to the path string for ease of use (buildMeta uses this value).
			const fullSlug = doc?.fullSlug ?? doc?.slug?.current
			node.parent.val[node.key] = fullSlug ? leadingSlash(fullSlug) : undefined
			return
		}
		// accounts for objects named "link" AND the custom linkType selector that has the page object in it
		if (['link', 'button'].includes(node.key) || ['page'].includes(node.key)) {
			const isExternal = node.parent?.val?.linkType === 'external'
			const isHomepage = doc._type === 'home' || doc._type === 'homepage'
			const values: Record<string, any> = {
				label: node.parent?.val?.label,
				linkType: node.parent?.val?.linkType,
			}

			// Preserve _type if it exists (important for portable text markDefs)
			if (node.parent?.val?._type) {
				values._type = node.parent.val._type
			}

			if (isExternal) {
				;(values as any).url = node.parent?.val?.url
			} else {
				// Use slug from stored document (uses fullSlug if available)
				// Fall back to "/" for homepage if no slug exists
				const currentSlug = doc.slug?.current || (isHomepage ? '/' : undefined)

				;(values as any).slug = {
					current: currentSlug ? leadingSlash(currentSlug) : undefined,
					// ...doc, // adding this resolves ALL content for the referenced page, responses are too large
				}
			}

			if (node.parent?.val?.advanced) {
				values.advanced = node.parent.val.advanced
			}

			const _key = node.val._key || node.parent.val._key || doc._key
			if (_key) {
				;(values as any)._key = _key
			}
			Object.keys(node.parent.val).forEach((key) => {
				delete node.parent.val[key]
			})
			Object.keys(values).forEach((key) => {
				node.parent.val[key] = (values as any)[key]
			})
		} else {
			Object.keys(node.val).forEach((key) => {
				delete node.val[key]
			})
			Object.keys(doc).forEach((key) => {
				const value = doc[key]
				node.val[key] = typeof value === 'object' ? deepCopy(value) : value
			})
		}
	}

	const iterate = async (nodes: any) => {
		const ids = new Map()

		new WalkBuilder()
			.withGlobalFilter((a) => {
				// Skip parentPage fields - they're not needed in resolved data
				// if (a.key === 'parentPage') {
				// 	return false
				// }
				// Process reference fields
				return a.val && a.val._type === 'reference'
			})
			.withSimpleCallback((node) => {
				const refId = node.val._ref
				if (typeof refId !== 'string') {
					throw new TypeError('node.val is not set')
				}

				// if (!refId.startsWith("image-")) {
				if (!store.has(refId)) {
					// unresolved, add it to the list
					ids.set(refId, node)
				} else {
					// already resolved, can be replaced immediately
					replaceNode(node, refId)
				}
				// }
			})
			.walk(nodes)

		if (ids.size) {
			// fetch all references at once
			const documents = await sanityClient.fetch(
				`*[_id in [${[...ids.keys()].map((id) => `'${id}'`).join(',')}]]{...}`,
			)
			documents.forEach((element) => {
				// Use fullSlug if it exists, otherwise keep slug.current as is
				if (element.slug?.current) {
					if (element.fullSlug) {
						element.slug.current = element.fullSlug
					}
				}
				store.set(element._id, element)
			})

			// replace them
			ids.forEach((node, id) => {
				replaceNode(node, id)
			})

			if (!--maxDepth) {
				console.error('Sanity autoresolver max depth reached')
				return
			}

			// iterate threw newly fetched nodes
			await iterate(nodes)
		}
	}

	await iterate(inputData)
}

export default resolveLinks
