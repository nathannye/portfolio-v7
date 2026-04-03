import * as PrismNamespace from 'prismjs'
import { createResource, splitProps, type JSX } from 'solid-js'

type PrismLib = typeof PrismNamespace & {
	highlight: (code: string, grammar: object, language: string) => string
	languages: Record<string, object | undefined>
}

const Prism = (
	(PrismNamespace as { default?: PrismLib }).default ??
	PrismNamespace
) as PrismLib

function ensurePrismGlobal() {
	const g = globalThis as typeof globalThis & { Prism?: PrismLib }
	if (!g.Prism) g.Prism = Prism
}

const LANGUAGE_ALIASES: Record<string, string> = {
	js: 'javascript',
	ts: 'typescript',
	jsx: 'jsx',
	tsx: 'tsx',
	sh: 'bash',
	shell: 'bash',
	zsh: 'bash',
	yml: 'yaml',
	py: 'python',
	rb: 'ruby',
	rs: 'rust',
	go: 'go',
	md: 'markdown',
	html: 'markup',
	xml: 'markup',
	svg: 'markup',
	css: 'css',
	scss: 'scss',
	sass: 'scss',
	json: 'json',
	sql: 'sql',
	bash: 'bash',
	docker: 'docker',
	dockerfile: 'docker',
	graphql: 'graphql',
	gql: 'graphql',
}

export function normalizeLanguage(language: string | null | undefined): string {
	const raw = (language || 'plaintext').trim().toLowerCase()
	return LANGUAGE_ALIASES[raw] ?? raw
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

type LangLoader = () => Promise<void>

/** Explicit loaders so Vite emits separate chunks; chain deps where Prism grammars require it. */
const LANGUAGE_LOADERS: Record<string, LangLoader> = {
	// Bundled in main prism.js entry (markup, css, clike, javascript)
	javascript: async () => {},
	css: async () => {},
	markup: async () => {},
	clike: async () => {},

	typescript: async () => {
		await import('prismjs/components/prism-typescript.js')
	},
	jsx: async () => {
		await import('prismjs/components/prism-jsx.js')
	},
	tsx: async () => {
		await import('prismjs/components/prism-typescript.js')
		await import('prismjs/components/prism-jsx.js')
		await import('prismjs/components/prism-tsx.js')
	},
	json: async () => {
		await import('prismjs/components/prism-json.js')
	},
	json5: async () => {
		await import('prismjs/components/prism-json.js')
		await import('prismjs/components/prism-json5.js')
	},
	bash: async () => {
		await import('prismjs/components/prism-bash.js')
	},
	markdown: async () => {
		await import('prismjs/components/prism-markdown.js')
	},
	python: async () => {
		await import('prismjs/components/prism-python.js')
	},
	rust: async () => {
		await import('prismjs/components/prism-rust.js')
	},
	go: async () => {
		await import('prismjs/components/prism-go.js')
	},
	yaml: async () => {
		await import('prismjs/components/prism-yaml.js')
	},
	sql: async () => {
		await import('prismjs/components/prism-sql.js')
	},
	scss: async () => {
		await import('prismjs/components/prism-scss.js')
	},
	ruby: async () => {
		await import('prismjs/components/prism-ruby.js')
	},
	php: async () => {
		await import('prismjs/components/prism-markup-templating.js')
		await import('prismjs/components/prism-php.js')
	},
	docker: async () => {
		await import('prismjs/components/prism-docker.js')
	},
	graphql: async () => {
		await import('prismjs/components/prism-graphql.js')
	},
}

async function loadPrismLanguage(id: string): Promise<void> {
	if (Prism.languages[id]) return
	ensurePrismGlobal()
	const loader = LANGUAGE_LOADERS[id]
	if (loader) {
		await loader()
		return
	}
	// Unknown id: no extra chunk; plaintext grammar is always available on Prism core
}

export interface PrismCodeBlockProps {
	code: string
	language?: string | null
	class?: string
}

export function PrismCodeBlock(props: PrismCodeBlockProps): JSX.Element {
	const [local, rest] = splitProps(props, ['code', 'language', 'class'])

	const [innerHtml] = createResource(
		() => [local.code, local.language] as const,
		async ([code, language]) => {
			const id = normalizeLanguage(language)
			await loadPrismLanguage(id)
			const grammar = Prism.languages[id]
			if (grammar) {
				return Prism.highlight(code ?? '', grammar, id)
			}
			const plain = Prism.languages.plaintext
			if (plain) {
				return Prism.highlight(code ?? '', plain, 'plaintext')
			}
			return escapeHtml(code ?? '')
		},
	)

	const codeClass = () =>
		[`language-${normalizeLanguage(local.language)}`, local.class]
			.filter(Boolean)
			.join(' ')

	return (
		<pre {...rest}>
			<code
				class={codeClass()}
				innerHTML={innerHtml() ?? ''}
			/>
		</pre>
	)
}
