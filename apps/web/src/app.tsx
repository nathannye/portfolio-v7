import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'

import Footer from './components/Footer'
import GlobalLayout from './components/GlobalLayout'
import { useViewport } from './hooks/useViewport'

export default function App() {
	useViewport()
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<GlobalLayout>
						<Suspense>
							{props.children}
							<Footer />
						</Suspense>
					</GlobalLayout>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
