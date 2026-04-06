import { Mesh, PlaneGeometry, MeshBasicMaterial } from 'three'
import { clientRectGl } from '~/utils/clientRect'
import Camera from '../Camera'
import { Scroll } from '~/app/scroll'
import screen from '../utils/screen'

export default class Quad extends Mesh {
	constructor(element) {
		super(new PlaneGeometry(1, 1), new MeshBasicMaterial({ color: 0x00ff00 }))

		this.element = element
		this.init()
	}

	init() {
		this.resize()
	}

	scroll() {
		this.position.y = this.bounds.centerY + Scroll.glY
	}

	resize() {
		this.bounds = clientRectGl(this.element)
		this.scale.set(this.bounds.width, this.bounds.height, 1)
		this.position.x = this.bounds.centerX
		this.position.y = this.bounds.centerY
	}

	render() {}
}
