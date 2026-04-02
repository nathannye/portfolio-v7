import { createStore } from 'solid-js/store'

const [nav, setNav] = createStore({
	hidden: false,
	scrolled: false,
})

export { nav, setNav }
