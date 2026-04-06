import { CineonToneMapping, WebGLRenderer } from 'three'
import screen from './utils/screen'

export default class Renderer extends WebGLRenderer {
	constructor() {
		super({ antialias: true })

		this.resize()

		this.toneMapping = CineonToneMapping
		this.toneMappingExposure = 0.8

		this.setClearColor(0x000000, 0)
		this.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
	}

	resize() {
		this.setSize(screen.x, screen.y)
	}
}
