import type { JSX } from 'solid-js'
import { ErrorBoundary, Show, splitProps } from 'solid-js'

type SliceErrorBoundaryProps = {
	_type: string
	children: JSX.Element
	[key: string]: any
}

export default function SliceErrorBoundary(props: SliceErrorBoundaryProps) {
	const [local, rest] = splitProps(props, ['_type', 'children'])

	const createFallback = (err: Error, reset: () => void) => {
		console.error(`Error rendering Sanity slice${local._type || ''}:`, err)
		if (process.env.NODE_ENV === 'production') {
			return null
		}
		let cmsJson = ''
		try {
			cmsJson = JSON.stringify(rest, null, 2)
		} catch {
			cmsJson = '[unserializable cms data]'
		}
		return (
			<div class="my-12 rounded-md border border-red-300 bg-red-50 p-12 text-red-900">
				<p class="font-semibold">
					Slice render error{local._type ? ` (${local._type})` : ''}: {err.message}
				</p>
				<div class="mt-8">
					<button
						type="button"
						onClick={reset}
						class="rounded border border-red-400 px-8 py-4 text-xs font-medium hover:bg-red-100"
					>
						Try rendering again
					</button>
				</div>
				<Show when={cmsJson}>
					<details class="mt-8">
						<summary class="cursor-pointer text-sm font-medium">
							Show slice data
						</summary>
						<pre class="mt-8 max-h-300 overflow-auto rounded bg-red-100 p-8 text-xs">
							{cmsJson}
						</pre>
					</details>
				</Show>
			</div>
		)
	}

	return (
		<ErrorBoundary fallback={createFallback}>{local.children}</ErrorBoundary>
	)
}
