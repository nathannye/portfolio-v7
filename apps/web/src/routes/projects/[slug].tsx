import { getDocumentBySlug, SanityComponents, SanityPage } from '@local/sanity'
import { Link, Meta, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import gsap from 'gsap'
import { lazy, onMount, Show } from 'solid-js'
import CreativeWorkMarkup from '~/components/project/CreativeWorkMarkup'
import ProjectHero from '~/components/project/ProjectHero'
import { onPageLeave } from '~/utils'

const getProject = query(async (slug: string) => {
	'use server'
	return await getDocumentBySlug('project', slug, {
		extraQuery:
			'[0]{title, slug, role, slices, stack, year, mainImage, partners, liveLink, _createdAt, _updatedAt, description}',
	})
}, 'project-details')

export default function ProjectPage({ params }) {
	let el
	const fetcher = createAsync(() => getProject(params.slug))

	onMount(() => {
		onPageLeave(el, async () => {
			return await gsap.to(el, { opacity: 0, duration: 0.4 })
		})
	})

	const slices = {
		mediaDuo: lazy(() => import('~/slices/MediaDuo')),
	}

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
