import { BoxGeometry, Mesh, MeshBasicMaterial, MeshNormalMaterial } from 'three'

export default class Test extends Mesh {
	constructor() {
		super()

		this.geometry = new BoxGeometry(2, 2, 2)
		this.material = new MeshNormalMaterial()

		this.position.set(0, 0, 0)
		this.rotation.set(0, 0, 0)
		this.scale.set(1, 1, 1)
	}
}
