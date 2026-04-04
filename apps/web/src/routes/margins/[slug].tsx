import { getDocumentBySlug, PortableText, SanityPage } from '@local/sanity'
import { Link, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { Show } from 'solid-js'
import MarginHero from '~/components/margin/MarginHero'

const getMargin = query(async (slug: string) => {
	'use server'
	return await getDocumentBySlug('margin', slug, {
		extraQuery:
			'[0]{title, slug, excerpt, tags, firstPublished, body, mainImage}',
	})
}, 'margin-details')

export default function ProjectPage({ params }) {
	const fetcher = createAsync(() => getMargin(params.slug))

	return (
		<SanityPage component="article" fetcher={fetcher}>
			{(data) => {
				return (
					<div>
						<Title>{data.title} • Nathan Nye</Title>
						<Link rel="canonical" href={`https://nye.dev${data.slug}`} />
						<MarginHero {...data} />
						<div class="px-margin-1">
							<Show when={data.excerpt}>
								<div class="w-grid-8 [&_p]:!body-2 mb-90 opacity-90 ml-grid-2-w">
									<PortableText value={data.excerpt} />
								</div>
							</Show>
							<Show when={data.body}>
								<div class="w-grid-8 opacity-90 [&>*]:ml-grid-2-w">
									<PortableText value={data.body} />
								</div>
							</Show>
						</div>
					</div>
				)
			}}
		</SanityPage>
	)
}
