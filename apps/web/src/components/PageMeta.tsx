import { Link, Meta, Title } from '@solidjs/meta'
import { Show } from 'solid-js'

type PageMetaProps = {
	title: string
	slug: string
	description?: string
}

export default function PageMeta(props: PageMetaProps) {
	const { title, slug } = props
	return (
		<>
			<Title>{props.title} • Nathan Nye</Title>
			<Link rel="canonical" href={`https://nye.dev${props.slug}`} />
			<Show when={props.description}>
				<Meta name="description" content={props.description} />
			</Show>
		</>
	)
}
