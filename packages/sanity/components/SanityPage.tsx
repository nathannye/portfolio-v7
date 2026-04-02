import type { SanityDocumentStub } from '@sanity/client'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'

interface SanityPageProps {
	children: (data: SanityDocumentStub) => JSX.Element
	fetcher?: any
	class?: string
}

export default function SanityPage(props: SanityPageProps) {
	return (
		<div class={`min-h-screen ${props.class}`}>
			<Show
				fallback={<div class="flex-center h-screen w-screen">404</div>}
				when={props.fetcher() && props.children}
			>
				{props.children(props.fetcher())}
			</Show>
		</div>
	)
}
