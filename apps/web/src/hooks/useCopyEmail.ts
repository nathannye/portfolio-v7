import { createSignal } from 'solid-js'
import { wrapArray } from '~/utils/array'
import { copyToClipboard } from '~/utils/clipboard'

const text = [
	'Copied!',
	'Copied!',
	'Copied, again 👀',
	'Copied, again 👀',
	'Seriously?',
	`You can stop anytime...`,
]

export const useCopyEmail = () => {
	const [copied, setCopied] = createSignal(false)
	const [copyCount, setCopyCount] = createSignal(0)

	const copyText = () => wrapArray(text, copyCount())

	const handleCopy = () => {
		copyToClipboard('nathan@nye.dev')
		setCopied(true)
		setCopyCount(copyCount() + 1)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return {
		copied,
		copyText,
		handleCopy,
		copyCount,
	}
}
