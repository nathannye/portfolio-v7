import {
	MdFormatBold,
	MdFormatItalic,
	MdFormatStrikethrough,
	MdFormatUnderlined,
	MdSubscript,
	MdSuperscript,
} from 'react-icons/md'
import {
	defineField,
	type FieldDefinition,
	type FieldDefinitionBase,
	type PortableTextBlock,
} from 'sanity'

import { portableLink } from './portable-link'

type PortableTextHeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type PortableTextList = 'bullet' | 'number'
type PortableTextDecorator = 'bold' | 'italic' | 'underline' | 'strikethrough'

type PortableTextCreatiorOptions = {
	annotations?: FieldDefinition[]
	headings?: PortableTextHeading[]
	lists?: PortableTextList[]
	decorators?: PortableTextDecorator[]
	blocks?: FieldDefinition[] // custom blocks
	disableLinks?: boolean
	fieldOptions?: FieldDefinitionBase
	rows?: number
	disableCharacterCount?: boolean
	description?: string
}

const SubComponent = (props) => <sub>{props.children}</sub>
const SupComponent = (props) => <sup>{props.children}</sup>

const decoratorMap = {
	bold: {
		title: 'Bold',
		value: 'strong',
		icon: MdFormatBold,
	},
	italic: {
		title: 'Italic',
		value: 'em',
		icon: MdFormatItalic,
	},
	strikethrough: {
		title: 'Strikethrough',
		value: 'strike-through',
		icon: MdFormatStrikethrough,
	},
	underline: {
		title: 'Underline',
		value: 'underline',
		icon: MdFormatUnderlined,
	},
	// subscript: {
	// 	title: 'Subscript',
	// 	value: 'sub',
	// 	icon: MdSubscript,
	// 	component: SubComponent,
	// },
	// superscript: {
	// 	title: 'Superscript',
	// 	value: 'sup',
	// 	icon: MdSuperscript,
	// 	component: SupComponent,
	// },
}

const DEFAULT_OPTIONS = {
	headings: ['h2', 'h3', 'h4'] as PortableTextHeading[],
	lists: ['bullet', 'number'] as PortableTextList[],
	decorators: [
		'bold',
		'italic',
		'underline',
		'strikethrough',
	] as PortableTextDecorator[],
	blocks: [] as FieldDefinition[],
	fieldOptions: {},
}

const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const mergedOptions = (options: PortableTextCreatiorOptions) => {
	return {
		...DEFAULT_OPTIONS,
		...options,
	}
}

const createItems = (items: string[], nameMap: Record<string, any> = {}) => {
	return items.map((item) => {
		const hasIcon = nameMap?.[item]?.icon
		const hasComponent = nameMap?.[item]?.component

		const base = {
			title: capitalize(item),
			value: nameMap?.[item]?.value || item,
		}
		if (hasIcon) {
			return {
				...base,
				icon: nameMap?.[item]?.icon,
			}
		}
		if (hasComponent) {
			return {
				...base,
				component: nameMap?.[item]?.component,
			}
		}
		return base
	})
}

export const createPortableText = (
	fieldName: string,
	options: PortableTextCreatiorOptions = DEFAULT_OPTIONS,
): FieldDefinition => {
	const opts = mergedOptions(options)
	const annotations = [...(opts.annotations || [])]
	const decorators = createItems(opts.decorators, decoratorMap)
	const lists = createItems(opts.lists)
	const headings = createItems(opts.headings)

	if (!options.disableLinks) {
		annotations.push(portableLink)
	}

	const arrayOf: Array<{
		type: string
		styles?: { title: string; value: string }[]
		lists?: { title: string; value: string }[]
		marks?: { annotations: any[]; decorators: any[] }
	}> = [
		{
			type: 'block',
			styles: [{ title: 'Normal', value: 'normal' }, ...headings],
			lists,
			marks: {
				annotations,
				decorators,
			},
		},
	]

	if (opts.blocks?.length > 0) {
		arrayOf.push(...opts.blocks)
	}

	const fieldOpts = {
		rows: opts.rows || 11,
		disableCharacterCount: opts.disableCharacterCount || false,
		...opts.fieldOptions,
	}

	return defineField({
		name: fieldName,
		options: fieldOpts,
		type: 'array',
		of: arrayOf,
		...opts.fieldOptions,
	})
}
