import { PerspectiveCamera } from 'three'
import screen from '~/gl/utils/screen'

export default class Camera extends PerspectiveCamera {
	constructor(fov = 45, near = 0.1, far = 100) {
		super(fov, screen.ratio.x, near, far)

		this.position.set(0, 0, 2)
	}

	get glViewSize() {
		const fovInRad = (this.fov * Math.PI) / 180
		const height = Math.abs(this.position.z * Math.tan(fovInRad / 2) * 2)

		const w = height * (screen.x / screen.y)
		const h = height
		const pixels = (w / screen.x + h / screen.y) / 2

		return { w, h, pixels }
	}

	resize() {
		this.aspect = screen.ratio.x
		this.updateProjectionMatrix()

		screen.glViewSize = this.glViewSize
	}
}
