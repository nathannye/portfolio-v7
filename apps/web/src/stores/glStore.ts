import { createStore } from 'solid-js/store'

const [gl, setGl] = createStore({
	stage: null,
})

export { gl, setGl }
