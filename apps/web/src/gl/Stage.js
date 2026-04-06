import Camera from './Camera'
import InputManager from './managers/InputManager'

import Renderer from './Renderer'
import Scene from './Scene'
import { resizeScreen } from './utils/screen'

export default class Stage {
	constructor() {
		this.renderer = new Renderer()
		this.camera = new Camera()
		this.scene = new Scene()
		console.log(this)
	}

	init(container) {
		this.resize()

		container.appendChild(this.renderer.domElement)

		this.inputManager = new InputManager()
		this.inputManager.addEvents()
	}

	resize() {
		resizeScreen()
		this.camera.resize()
		this.renderer.resize()

		// call this so that when you stop scrolling and resize, its still in sync
		this.scroll()
	}

	scroll(y) {
		this.scene.children.forEach(
			(actor) => typeof actor.scroll === 'function' && actor.scroll(y),
		)
	}

	render() {
		this.inputManager.render()
		this.renderer.render(this.scene, this.camera)
	}

	destroy() {
		this.renderer.dispose()
	}
}
