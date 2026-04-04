import { createAsync } from '@solidjs/router'
import * as PrismNamespace from 'prismjs'
import { type JSX, splitProps } from 'solid-js'

type PrismLib = typeof PrismNamespace & {
	highlight: (code: string, grammar: object, language: string) => string
	languages: Record<string, object | undefined>
}

const Prism = ((PrismNamespace as { default?: PrismLib }).default ??
	PrismNamespace) as PrismLib

/** Prism component scripts use the global `Prism` binding; keep it aligned with this module's instance. */
function ensurePrismGlobal() {
	;(globalThis as typeof globalThis & { Prism: PrismLib }).Prism = Prism
}

ensurePrismGlobal()

/** When Studio language is "javascript" but the snippet is JSX, Prism needs the jsx grammar (tags + JS). */
function grammarIdForHighlight(normalizedLang: string, code: string): string {
	if (normalizedLang === 'javascript' && looksLikeJsx(code)) return 'jsx'
	if (normalizedLang === 'typescript' && looksLikeJsx(code)) return 'tsx'
	return normalizedLang
}

function looksLikeJsx(code: string): boolean {
	if (!code.includes('<')) return false
	// Closing tags / fragments — strong signals vs comparisons like `a<b` or generics `Foo<T>`.
	if (code.includes('</') || code.includes('<>')) return true
	if (/\bclassName\s*=/.test(code)) return true
	// JSX value positions (avoid matching `Array<Thing>`-style generics).
	if (/\breturn\s+<\s*[A-Za-z]/.test(code)) return true
	if (/[=:(]\s*<\s*[A-Za-z]/.test(code)) return true
	if (/=>\s*<\s*[A-Za-z]/.test(code)) return true
	return false
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
	md: 'markdown',
	html: 'markup',
	css: 'css',
	bash: 'bash',
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
		// jsx grammar clones Prism.languages.javascript; explicit load avoids ordering issues across chunks.
		await import('prismjs/components/prism-javascript.js')
		await import('prismjs/components/prism-jsx.js')
	},
	tsx: async () => {
		await import('prismjs/components/prism-typescript.js')
		await import('prismjs/components/prism-jsx.js')
		await import('prismjs/components/prism-tsx.js')
	},
	bash: async () => {
		await import('prismjs/components/prism-bash.js')
	},
	markdown: async () => {
		await import('prismjs/components/prism-markdown.js')
	},

	yaml: async () => {
		await import('prismjs/components/prism-yaml.js')
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

	const innerHtml = createAsync(
		async () => {
			const code = local.code
			const language = local.language
			const normalized = normalizeLanguage(language)
			const id = grammarIdForHighlight(normalized, code ?? '')
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
		{ initialValue: '' },
	)

	const codeClass = () =>
		[
			`language-${grammarIdForHighlight(normalizeLanguage(local.language), local.code ?? '')}`,
			local.class,
		]
			.filter(Boolean)
			.join(' ')

	return (
		<pre {...rest}>
			<code class={codeClass()} innerHTML={innerHtml()} />
		</pre>
	)
}
