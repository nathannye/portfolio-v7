import { lerp } from '~/utils/math'
import screen from '../utils/screen'

export default class InputManager {
	constructor() {
		this._x = 0
		this._y = 0
		this._lerpedX = 0
		this._lerpedY = 0
		this._prevX = 0
		this._prevY = 0
		this._velocityX = 0
		this._velocityY = 0
	}

	get coords() {
		return { x: this._lerpedX, y: this._lerpedY }
	}

	get normalizedCoords() {
		const x = (this._lerpedX / screen.x) * 2 - 1
		const y = (this._lerpedY / screen.y) * 2 - 1

		return { x, y }
	}

	get velocity() {
		return { x: this._velocityX, y: this._velocityY }
	}

	addEvents() {
		window.addEventListener('mousemove', (e) => {
			this._prevX = this._x
			this._prevY = this._y
			this._x = e.clientX
			this._y = e.clientY

			this._velocityX = this._x - this._prevX
			this._velocityY = this._y - this._prevY
		})
	}

	render() {
		this._lerpedX = lerp(this._lerpedX, this._x, 0.0535)
		this._lerpedY = lerp(this._lerpedY, this._y, 0.0535)
	}
}
