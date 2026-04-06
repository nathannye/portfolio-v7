import { Scene as ThreeScene } from 'three'

export default class Scene extends ThreeScene {
	constructor() {
		super()

		this.actors = new Map()
	}
}
