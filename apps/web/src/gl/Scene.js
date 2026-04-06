import { Scene as ThreeScene } from 'three'
import ProjectImageFlipper from './actors/project-image-flipper/ProjectImageFlipper'

export default class Scene extends ThreeScene {
	createActorsByPath(path) {
		// if (path === '/') {
		// 	this.projectImageFlipper = new ProjectImageFlipper()
		// 	this.add(this.projectImageFlipper)
		// }
	}
}
