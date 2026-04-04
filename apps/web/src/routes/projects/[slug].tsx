import { getDocumentBySlug, SanityComponents, SanityPage } from '@local/sanity'
import { Link, Meta, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { lazy, Show } from 'solid-js'
import CreativeWorkMarkup from '~/components/project/CreativeWorkMarkup'
import ProjectHero from '~/components/project/ProjectHero'

const getProject = query(async (slug: string) => {
	'use server'
	return await getDocumentBySlug('project', slug, {
		extraQuery:
			'[0]{title, slug, role, slices, stack, year, mainImage, partners, liveLink, _createdAt, _updatedAt, description}',
	})
}, 'project-details')

const slices = {
	mediaDuo: lazy(() => import('~/slices/MediaDuo')),
}

export default function ProjectPage({ params }) {
	let el
	const fetcher = createAsync(() => getProject(params.slug))

	return (
		<div ref={el}>
			<SanityPage fetcher={fetcher}>
				{(data) => {
					return (
						<>
							<Title>{data.title} • Nathan Nye</Title>
							<Link rel="canonical" href={`https://nye.dev${data.slug}`} />
							<Show when={data.description?.length}>
								<Meta name="description" content={data.description} />
							</Show>
							<CreativeWorkMarkup {...data} />
							<ProjectHero {...data} />
							<div
								style={{
									'--gap': '9rem',
									'--gap-mobile': '14rem',
								}}
								class="flex flex-col mt-[var(--gap-mobile)] lg:mt-[var(--gap)] w-full gap-y-[var(--gap-mobile)] lg:gap-y-[var(--gap)] grid-contain px-margin-1"
							>
								<SanityComponents componentList={slices} components={data.slices} />
							</div>
						</>
					)
				}}
			</SanityPage>
		</div>
	)
}
