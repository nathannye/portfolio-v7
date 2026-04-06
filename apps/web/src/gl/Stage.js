// import { setLoadingStore } from '~/stores/loadingStore'
import { isServer } from 'solid-js/web'
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
		if (isServer) return
		this.resize()

		container.appendChild(this.renderer.domElement)

		InputManager.addEvents()
		// LoadManager.start().then(() => {
		// 	// setLoadingStore('loaded', true)
		// })
	}

	resize() {
		resizeScreen()
		console.log(this)
		if (this.camera) this.camera.resize()
		// this.scene.resize()

		// this.renderer.resize()

		// call this so that when you stop scrolling and resize, its still in sync
		this.scroll()
	}

	scroll(y) {
		this.scene.children.forEach(
			(actor) => typeof actor.scroll === 'function' && actor.scroll(y),
		)
	}

	render() {
		InputManager.render()

		this.renderer.render(Scene, Camera)
	}

	destroy() {
		this.renderer.dispose()
	}
}
