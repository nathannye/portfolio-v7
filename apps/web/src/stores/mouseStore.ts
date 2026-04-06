import { createStore } from 'solid-js/store'

const [mouse, setMouse] = createStore({
	x: 0,
	y: 0,
})

export { mouse, setMouse }
