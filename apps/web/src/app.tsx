import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { onMount, Suspense } from 'solid-js'
// import GlobalLayout from './components/GlobalLayout'
import { useViewport } from './hooks/useViewport'
import './app.css'
import GlobalLayout from './components/GlobalLayout'

export default function App() {
	useViewport()

	onMount(() => {
		if (process.env.NODE_ENV === 'production') {
			injectSpeedInsights()
		}
	})

	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<GlobalLayout>
						<Suspense>{props.children}</Suspense>
					</GlobalLayout>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
