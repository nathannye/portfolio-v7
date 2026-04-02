export const snakeToCamelCase = (str: string) => {
	return str.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
		c ? c.toUpperCase() : ' ' + d.toUpperCase(),
	)
}

/**
 * Converts Portable Text blocks to a plain string for preview purposes.
 * Extracts text from block children and joins them with newlines.
 *
 * @param blocks - Array of Portable Text blocks (can be null/undefined)
 * @param maxLength - Optional maximum length to truncate the result
 * @returns Plain text string extracted from the portable text blocks
 */
export const portableTextToString = (
	blocks: any[] | null | undefined,
	maxLength?: number,
): string => {
	if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
		return ''
	}

	const textParts: string[] = []

	for (const block of blocks) {
		// Handle standard text blocks
		if (
			block._type === 'block' &&
			block.children &&
			Array.isArray(block.children)
		) {
			const blockText = block.children
				.map((child: any) => {
					// Extract text from span children
					if (child._type === 'span' && child.text) {
						return child.text
					}
					return ''
				})
				.join('')

			if (blockText.trim()) {
				textParts.push(blockText)
			}
		}
	}

	let result = textParts.join('\n\n')

	// Truncate if maxLength is provided
	if (maxLength && result.length > maxLength) {
		result = result.substring(0, maxLength).trim() + '...'
	}

	return result
}
