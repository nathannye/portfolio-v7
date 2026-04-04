import gsap from 'gsap'

export const parseAnimation = (el: HTMLElement) => {
	const itemIndex = parseFloat(el.dataset.index || '0') || 0
	const q = gsap.utils.selector(el)

	return {
		itemIndex,
		q,
	}
}
