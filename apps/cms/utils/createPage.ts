import { HiDocumentText } from 'react-icons/hi'
import type { IconType } from 'react-icons/lib'
import { MdFormatQuote } from 'react-icons/md'
import {
	type DocumentDefinition,
	defineField,
	type FieldDefinition,
	type FormFieldGroup,
	type PreviewConfig,
} from 'sanity'
import { SlugInput } from 'sanity-plugin-prefixed-slug'
import type { SchemaMarkupType } from '../plugins/seo'
import { pageDefaultsGroups } from './_pageDefaults'
import { createPortableText } from './portable-text/createPortableText'

type PageAttributes = {
	title: string
	name: string
	tabs?: boolean
	icon?: IconType
	slug?: string | false
	groups?: FormFieldGroup[]
	slices?: boolean | string
	orderings?: any[]
	preview?: PreviewConfig
	hasParentPage?: boolean
	prefix?: string // Add prefix to slug, i.e "/blog/..."
	seo?: boolean // Add SEO attributes to page
	body?: boolean // Adds a rich text field for text-based pages
	fields?: Array<FieldDefinition> // Add extra fields on top of defaults
	schemaMarkupType?: SchemaMarkupType
}

const addDefaultGroups = (fields: Array<FieldDefinition>) => {
	return fields.map((field) => {
		if (!field.group) {
			field.group = 'content'
		}

		return field
	})
}

const slugify = (str: string) =>
	str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')

const defaultOptions = {
	slug: true,
	seo: true,
	slices: true,
	icon: HiDocumentText,
}

export const createPage = (opts: PageAttributes): DocumentDefinition => {
	const options = { ...defaultOptions, ...opts }
	const allFields = []
	const {
		title,
		name,
		seo,
		slug,
		prefix,
		icon,
		body,
		fields = [],
		preview,
		groups,
		orderings,
		slices,
	} = options

	if (body) {
		allFields.push(
			createPortableText('body', {
				headings: ['h2', 'h3', 'h4'],
				lists: ['bullet', 'number'],
				decorators: ['bold', 'italic', 'underline', 'strikethrough', 'code'],
				blocks: [
					{
						name: 'code',
						type: 'code',
						options: {
							languageAlternatives: [
								{ title: 'JavaScript', value: 'javascript' },
								{ title: 'JSX', value: 'jsx' },
								{ title: 'TypeScript', value: 'typescript' },
								{ title: 'TSX', value: 'tsx' },
								{ title: 'HTML', value: 'html' },
								{ title: 'CSS', value: 'css' },
							],
						},
					},
					{
						name: 'image',
						type: 'image',
					},
					{
						name: 'video',
						type: 'mux.video',
					},
					{
						name: 'linedList',
						type: 'linedList',
					},
				],
			}),
		)
	}

	// if (seo !== false) {
	// 	allFields.push({
	// 		group: 'seo',
	// 		name: 'seo',
	// 		type: 'metadata',
	// 	})
	// 	allFields.push({
	// 		name: 'schemaMarkup',
	// 		group: process.env.NODE_ENV === 'development' ? 'schema-markup' : 'content',
	// 		type: 'schemaMarkup',
	// 		hidden: () => process.env.NODE_ENV !== 'development',
	// 		options: schemaMarkupType
	// 			? { defaultSchemaType: schemaMarkupType }
	// 			: undefined,
	// 	})
	// }

	if (slug) {
		allFields.unshift({
			name: 'slug',
			description: 'Click generate to build a URL for this page.',
			title: 'Slug',
			type: 'slug',
			initialValue: slugify(title),
			components: {
				input: prefix ? SlugInput : undefined,
			},
			options: {
				source: 'title',
				urlPrefix: `${prefix || slugify(title)}/`,
				storeFullUrl: true,
				isUnique: (e) => true,
			},
			validation: (Rule) => Rule.required().error('This page needs a slug'),
		})
	}

	if (title) {
		allFields.unshift({
			name: 'title',
			initialValue: prefix ? '' : title,
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
			title: 'Page Title',
		})
	}

	if (slices) {
		allFields.push({
			name: 'slices',
			title: 'Slices',
			group: 'content',
			type: typeof slices === 'string' ? slices : 'pageSlices',
		})
	}

	const reconciledFields = [...addDefaultGroups([...allFields, ...fields])]

	const page = defineField({
		type: 'document',
		title,
		name,
		icon,
		groups: [...pageDefaultsGroups, ...(groups || [])].sort((a, b) =>
			a.title.localeCompare(b.title),
		),
		fields: reconciledFields,
		preview: preview || {
			select: {
				title: 'title',
				slug: 'slug',
			},
			prepare(select) {
				const { title, slug } = select
				return {
					title,
					subtitle: slug && prefix && (slug.fullUrl || slug.current || ''),
					icon,
				}
			},
		},
		orderings,
	})

	return page
}

export default createPage
