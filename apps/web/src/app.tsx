import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Show, Suspense } from 'solid-js'
import Navbar from './components/Navbar'
import './app.css'
import { MetaProvider } from '@solidjs/meta'
import GridOverlay from './components/GridOverlay'
import { scroll } from './subscribers/scroll'

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Navbar />
					<Show when={process.env.NODE_ENV === 'development'}>
						<GridOverlay />
					</Show>
					<main use:scroll>
						<Suspense>{props.children}</Suspense>
					</main>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
