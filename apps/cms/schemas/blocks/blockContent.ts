import { createPortableText } from '../../utils/portable-text/createPortableText'

export default createPortableText('blockContent', {
	headings: ['h2', 'h3', 'h4'],
	lists: ['bullet', 'number'],
	decorators: ['bold', 'italic', 'underline', 'strikethrough'],
})
