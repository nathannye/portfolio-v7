import { TextureLoader } from 'three'

const loader = new TextureLoader()
loader.setCrossOrigin('anonymous')

export const loadTexture = (url: string) => {
	return new Promise((resolve, reject) => {
		loader.load(
			url,
			(texture) => {
				resolve(texture)
			},
			undefined,
			(error) => {
				reject(error)
			},
		)
	})
}
