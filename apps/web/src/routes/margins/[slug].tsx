import { getDocumentBySlug, PortableText, SanityPage } from '@local/sanity'
import { createAsync, query } from '@solidjs/router'
import { Show } from 'solid-js'
import ArticleMarkup from '~/components/ArticleMarkup'
import MarginHero from '~/components/MarginHero'
import PageMeta from '~/components/PageMeta'

const getMargin = query(async (slug: string) => {
	'use server'
	return await getDocumentBySlug('margin', slug, {
		extraQuery: `[0]{title, slug, "description": pt::text(excerpt), excerpt, tags, firstPublished, body, mainImage, 
		"estimatedReadingTime": round(((length(pt::text(excerpt)) + length(pt::text(body)))/5/180) * 1.7) 
		}`,
	})
}, 'margin-details')

export default function ProjectPage({ params }) {
	const fetcher = createAsync(() => getMargin(params.slug))

	return (
		<SanityPage component="article" fetcher={fetcher}>
			{(data) => {
				return (
					<div class="pb-80">
						<PageMeta
							description={data.description}
							title={data.title}
							slug={data.slug.fullUrl}
						/>
						<ArticleMarkup
							datePublished={data.firstPublished}
							description={data.excerpt}
							keywords={data.keywords}
							title={data.title}
							_updatedAt={data._updatedAt}
						/>
						<MarginHero {...data} />
						<div class="px-margin-1">
							<Show when={data.excerpt}>
								<div class="lg:w-grid-8 border-inverted/10 py-30 border-y [&_p]:!body-2 mb-90 opacity-90 lg:ml-grid-2-w">
									<PortableText value={data.excerpt} />
								</div>
							</Show>
							<Show when={data.body}>
								<div class="opacity-90 lg:[&>*]:w-grid-7 lg:[&>*]:ml-grid-2-w">
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
