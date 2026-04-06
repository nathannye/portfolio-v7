// import { SRGBColorSpace, TextureLoader } from 'three'
// import sources from '~/gl/assets/sources'

// // import { setLoadingStore } from '~/stores/loadingStore'

// // Change EXTENSION_TO_LOADER to an object of arrays
// const EXTENSION_TO_LOADER = {
// 	texture: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
// }

// function getLoaderKeyFromExtension(extension) {
// 	for (const [loaderKey, extensions] of Object.entries(EXTENSION_TO_LOADER)) {
// 		if (extensions.includes(extension)) {
// 			return loaderKey
// 		}
// 	}
// 	return null
// }

// class LoadManager {
// 	constructor() {
// 		this.loaded = 0
// 		this.toLoad = sources.length
// 		this.items = new Map()

// 		this.loaders = {
// 			gltf: new GLTFLoader(),
// 			texture: new TextureLoader(),
// 		}
// 	}

// 	getItem(name) {
// 		return this.items.get(name)
// 	}

// 	onLoadItem() {}

// 	createResourcePromise(source) {
// 		return new Promise((resolve) => {
// 			const extension = source.path.split('.').pop().toLowerCase()
// 			const loaderKey = getLoaderKeyFromExtension(extension)

// 			if (!loaderKey) {
// 				console.warn(`File extension .${extension} not supported`)
// 				resolve(null)
// 				return
// 			}

// 			const loader = this.loaders[loaderKey]
// 			if (!loader) {
// 				console.warn(`No loader found for extension .${extension}`)
// 				resolve(null)
// 				return
// 			}

// 			loader.load(
// 				source.path,
// 				(file) => {
// 					switch (loaderKey) {
// 						case 'texture':
// 							file.flipY = true
// 							file.colorSpace = SRGBColorSpace
// 							break
// 					}

// 					this.loaded += 1
// 					this.items.set(source.name, file)

// 					// setLoadingStore('progress', this.loaded / this.toLoad)
// 					resolve(file)
// 				},
// 				undefined,
// 				(error) => {
// 					console.log(error)
// 					console.warn(`Loader error: ${source.path} failed to load`)
// 					resolve(null)
// 				},
// 			)
// 		})
// 	}

// 	async start() {
// 		const promises = []

// 		sources
// 			.filter((source) => source.path)
// 			.forEach((source) => {
// 				promises.push(this.createResourcePromise(source))
// 			})

// 		return await Promise.all(promises)
// 	}
// }

// export default new LoadManager()
