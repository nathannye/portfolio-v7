import { Group } from 'three'
import { Resizer } from '~/app/resizer'
import { Scroll } from '~/app/scroll'
import { clientRectGl } from '~/utils/clientRect'
import { clamp, map } from '~/utils/math'

export default class TrackedGroup extends Group {
	#resizeUnsub = Resizer.add(this.#resize.bind(this))
	#scrollUnsub = Scroll.add(this.#scroll.bind(this))

	inView = false
	scrollProgress = 0

	constructor(element) {
		super()

		this.element = element
		this.bounds = clientRectGl(this.element)
		this.position.y = this.bounds.centerY + Scroll.glScroll

		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.inView = true
				} else {
					this.inView = false
				}
			})
		})

		this.observer.observe(this.element)
	}

	#scroll() {
		if (!this.inView) return

		this.bounds = clientRectGl(this.element)
		this.position.y = this.bounds.centerY + Scroll.glScroll

		this.scrollProgress = clamp(
			0,
			1,
			map(Math.abs(this.position.y), 0, this.bounds.height * 2, 1, 0),
		)
	}

	#resize() {
		this.bounds = clientRectGl(this.element)
		// this.scale.set(this.bounds.width, this.bounds.height, 1)

		this.position.y = this.bounds.centerY + Scroll.glScroll
	}

	dispose() {
		this.#resizeUnsub()
		this.#scrollUnsub()
		this.parent.remove(this)
	}
}
