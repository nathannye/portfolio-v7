import { getDocumentBySlug, SanityPage } from '@local/sanity'
import { Link, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import MarginHero from '~/components/margin/MarginHero'

const getMargin = query(async (slug: string) => {
	'use server'
	return await getDocumentBySlug('margin', slug, {
		extraQuery: '[0]{title, slug, firstPublished, body}',
	})
}, 'margin-details')

export default function ProjectPage({ params }) {
	const fetcher = createAsync(() => getMargin(params.slug))

	return (
		<SanityPage fetcher={fetcher}>
			{(data) => {
				console.log(data)
				return (
					<div>
						<Title>{data.title} • Nathan Nye</Title>
						<Link rel="canonical" href={`https://nye.dev${data.slug}`} />
						<MarginHero {...data} />
					</div>
				)
			}}
		</SanityPage>
	)
}
