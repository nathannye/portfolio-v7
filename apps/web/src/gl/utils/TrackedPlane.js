import { Mesh, PlaneGeometry, ShaderMaterial } from 'three'
import { Resizer } from '~/app/resizer'
import { Scroll } from '~/app/scroll'
import { clientRectGl } from '~/utils/clientRect'
import { clamp, map } from '~/utils/math'

export default class TrackedPlane extends Mesh {
	#resizeUnsub = Resizer.add(this.#resize.bind(this))
	#scrollUnsub = Scroll.add(this.#scroll.bind(this))

	geometry = new PlaneGeometry(1, 1)
	inView = false
	scrollProgress = 0

	material = new ShaderMaterial({
		uniforms: {
			u_texture: { value: null },
		},
		vertexShader: `
      void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      void main(){
        gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
      }
    `,
	})

	constructor(element) {
		super()

		this.element = element
		this.bounds = clientRectGl(this.element)
		this.scale.set(this.bounds.width, this.bounds.height, 1)
		this.position.y = this.bounds.centerY + Scroll.glScroll

		this.#resize()
	}

	#scroll() {
		if (!this.inView) return

		this.bounds = clientRectGl(this.element)
		this.position.y = this.bounds.centerY + Scroll.glScroll
	}

	#resize() {
		this.bounds = clientRectGl(this.element)
		this.scale.set(this.bounds.width, this.bounds.height, 1)
		this.position.y = this.bounds.centerY + Scroll.glScroll

		this.#scroll()
	}

	dispose() {
		this.#resizeUnsub()
		this.#scrollUnsub()
		this.parent.remove(this)
	}
}
