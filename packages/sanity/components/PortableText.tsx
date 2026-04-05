import { createMemo, For, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { sanityLink } from '../utils/link'
import { PrismCodeBlock } from './PrismCodeBlock'
import './code.css'
import SanityImage from './SanityImage'

export interface PortableTextProps {
	value: any
	components?: Partial<PortableTextComponents>
	buttonAlign?: 'left' | 'right'
}

export interface PortableTextComponents {
	types?: Record<string, (props: any) => JSX.Element>
	marks?: Record<string, (props: any) => JSX.Element>
	block?: Record<string, (props: any) => JSX.Element>
	list?: Record<string, (props: any) => JSX.Element>
	listItem?: Record<string, (props: any) => JSX.Element>
}

const createDefaultComponents = (): PortableTextComponents => ({
	types: {
		code: (props) => (
			<PrismCodeBlock
				code={props.value.code ?? ''}
				language={props.value.language}
				class="!bg-inverted/4 mb-20 !font-mono [&_span]:!shadow-none p-20 lg:!text-[1.2rem] !text-[1.9rem] whitespace-pre-line block rounded-lg"
			/>
		),
		linedList: (props) => {
			const sortedItems = () => {
				if (props.sort === 'alpha') {
					return props.items.sort((a, b) => a.title.localeCompare(b.title))
				}
				return props.items
			}
			return (
				<section class="w-full mt-30">
					<ul class="w-full flex flex-col">
						<For each={sortedItems()}>
							{(item) => {
								const { attrs, linkType } = sanityLink(item.link)
								return (
									<li class="after:origin-left relative after:absolute mb-10 after:top-0 after:right-0 after:left-0 afer:w-full after:h-px after:bg-inverted/10 hover:px-14 duration-475 before:inset-0 before:bg-inverted before:size-full before:absolute before:duration-475 ease-expo-out before:origin-bottom before:scale-y-0 hover:before:scale-y-100 hover:text-primary before:-z-1">
										<Dynamic
											class="w-full body-2 flex gap-gutter-1 pt-15 lg:pt-10 pb-15 lg:pb-10 justify-between items-baseline"
											component={linkType ? 'a' : 'div'}
											{...attrs}
										>
											<h3 class="w-grid-4-w">{item.title}</h3>
											{/* <p class="opacity-70 w-grid-3-w">{item.description}</p> */}
											<span class="opacity-90 font-[90] text-right w-grid-1-w">→</span>
										</Dynamic>
									</li>
								)
							}}
						</For>
					</ul>
				</section>
			)
		},
		image: (props) => (
			<SanityImage class="lg:!ml-grid-1-w lg:!w-grid-12 my-40" src={props.value} />
		),
		callout: (props) => (
			<div class="lg:w-grid-6-w mb-80 rounded-sm bg-inverted/20 p-15">
				<h3 class="heading-5 font-[150]">{props.value.title}</h3>
				<p class="body-3 mt-12 font-[120]">{props.value.quote}</p>
			</div>
		),
	},
	block: {
		normal: (props) => {
			return <p class="body-2 mb-30 opacity-85">{props.children}</p>
		},

		blockquote: (props) => <blockquote>{props.children}</blockquote>,
		h2: (props) => (
			<h2 class="heading-3 mt-80 !text-balance mb-18 lg:!max-w-[50%]">
				{props.children}
			</h2>
		),
		h3: (props) => <h3 class="heading-4 mt-80 mb-18">{props.children}</h3>,
		h4: (props) => <h4 class="heading-5 mt-80 mb-18">{props.children}</h4>,
	},
	marks: {
		strong: (props) => <strong class="font-[220]">{props.children}</strong>,
		em: (props) => <em>{props.children}</em>,
		underline: (props) => (
			<span style={{ 'text-decoration': 'underline' }}>{props.children}</span>
		),
		code: (props) => {
			return (
				<code class="bg-inverted/5 font-mono inline-block px-3 py-1 rounded-sm">
					{props.children}
				</code>
			)
		},
		'strike-through': (props) => <del>{props.children}</del>,
		link: (props) => {
			const link = sanityLink({ ...props.value, link: props.value })

			return (
				<a class="underline" {...link.attrs}>
					{props.children}
				</a>
			)
		},
	},
	list: {
		bullet: (props) => (
			<ul class="flex flex-col gap-y-8 body-2 mb-30 max-lg:pl-25 list-disc">
				{props.children}
			</ul>
		),
		number: (props) => (
			<ol class="flex flex-col gap-y-8 body-2 mb-30 max-lg:pl-25 list-decimal">
				{props.children}
			</ol>
		),
	},
	listItem: {
		bullet: (props) => <li class="pl-7 opacity-85">{props.children}</li>,
		number: (props) => <li class="pl-7 opacity-85">{props.children}</li>,
	},
})

function nestLists(blocks: any[]) {
	const tree: any[] = []
	let currentList: any = null

	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i]
		if (block.listItem) {
			if (!currentList || currentList.listItem !== block.listItem) {
				currentList = {
					_type: '_list',
					_key: `${block._key}-list`,
					listItem: block.listItem,
					children: [block],
				}
				tree.push(currentList)
			} else {
				currentList.children.push(block)
			}
		} else {
			currentList = null
			tree.push(block)
		}
	}
	return tree
}

export function PortableText(props: PortableTextProps) {
	const components = createMemo(() => {
		const provided = props.components || {}
		const baseComponents = createDefaultComponents()
		return {
			types: { ...baseComponents.types, ...provided.types },
			marks: { ...baseComponents.marks, ...provided.marks },
			block: { ...baseComponents.block, ...provided.block },
			list: { ...baseComponents.list, ...provided.list },
			listItem: { ...baseComponents.listItem, ...provided.listItem },
		}
	})

	const blocks = createMemo(() => {
		if (!props.value) return []
		const val = Array.isArray(props.value) ? props.value : [props.value]
		return nestLists(val.filter(Boolean))
	})

	return (
		<For each={blocks()}>
			{(block) => <RenderNode block={block} components={components()} />}
		</For>
	)
}

function RenderNode(props: { block: any; components: PortableTextComponents }) {
	const { block, components } = props

	if (block._type === '_list') {
		const ListComponent =
			components.list[block.listItem] || components.list.bullet
		return (
			<Dynamic component={ListComponent}>
				<For each={block.children}>
					{(child) => <RenderNode block={child} components={components} />}
				</For>
			</Dynamic>
		)
	}

	if (block.listItem) {
		const ListItemComponent =
			components.listItem[block.listItem] || components.listItem.bullet
		return (
			<Dynamic component={ListItemComponent}>
				<RenderBlockContent block={block} components={components} />
			</Dynamic>
		)
	}

	if (block._type === 'block') {
		const style = block.style || 'normal'
		const BlockComponent = components.block[style] || components.block.normal
		return (
			<Dynamic component={BlockComponent} {...block} node={block}>
				<RenderBlockContent block={block} components={components} />
			</Dynamic>
		)
	}

	const CustomComponent = components.types[block._type]

	if (CustomComponent) {
		return <Dynamic component={CustomComponent} value={block} {...block} />
	}

	console.warn(
		`[PortableText] No component found for block type "${block._type}"`,
		// block,
	)
	return null
}

function RenderBlockContent(props: {
	block: any
	components: PortableTextComponents
}) {
	return (
		<For each={props.block.children}>
			{(span) => {
				if (span._type !== 'span') {
					const CustomComponent = props.components.types[span._type]
					if (!CustomComponent) {
						console.warn(
							`[PortableText] No component found for inline type "${span._type}"`,
							span,
						)
						return null
					}
					return <Dynamic component={CustomComponent} value={span} {...span} />
				}
				return (
					<RenderSpan
						span={span}
						markDefs={props.block.markDefs}
						components={props.components}
					/>
				)
			}}
		</For>
	)
}

function RenderSpan(props: {
	span: any
	markDefs: any[]
	components: PortableTextComponents
}) {
	const { span, markDefs, components } = props
	if (!span.marks || span.marks.length === 0) {
		return span.text
	}
	return (
		<MarkHandler
			marks={span.marks.slice()}
			markDefs={markDefs}
			components={components}
			text={span.text}
		>
			{span.text}
		</MarkHandler>
	)
}

function MarkHandler(props: {
	marks: string[]
	markDefs: any[]
	components: PortableTextComponents
	children: JSX.Element
	text: string
}) {
	if (props.marks.length === 0) {
		return props.children
	}
	const mark = props.marks[0]
	const rest = props.marks.slice(1)

	const def = props.markDefs?.find((m) => m._key === mark)
	const markType = def ? def._type : mark
	const MarkComponent = props.components.marks[markType]

	const content = (
		<MarkHandler
			marks={rest}
			markDefs={props.markDefs}
			components={props.components}
			text={props.text}
		>
			{props.children}
		</MarkHandler>
	)

	if (MarkComponent) {
		return (
			<Dynamic
				component={MarkComponent}
				value={def}
				markKey={mark}
				markType={markType}
				text={props.text}
			>
				{content}
			</Dynamic>
		)
	}

	return content
}

export default PortableText
