import {
	getDocumentBySlug,
	getDocumentByType,
	SanityComponents,
	SanityPage,
} from '@local/sanity'
import { Link, Meta, Title } from '@solidjs/meta'
import { createAsync, query, useLocation, useParams } from '@solidjs/router'
import gsap from 'gsap'
import { createEffect, lazy, onMount, Show } from 'solid-js'
import CreativeWorkMarkup from '~/components/CreativeWorkMarkup'
import PageMeta from '~/components/PageMeta'
import ProjectHero from '~/components/ProjectHero'
import ProjectNavButtons from '~/components/ProjectNavButtons'

const getProject = query(async (slug: string) => {
	'use server'

	const [project, allProjects] = await Promise.all([
		getDocumentBySlug('project', slug, {
			extraQuery:
				'[0]{title, slug, role, slices, stack, year, mainImage, partners, liveLink, _createdAt, _updatedAt, description}',
		}),
		getDocumentByType('project', {
			extraQuery: '{title, slug, year} | order(year desc)',
		}),
	])

	const index = allProjects.findIndex(
		(p: { slug: { current: string } }) => p.slug.current === slug,
	)

	const total = allProjects.length

	return {
		...project,
		previous: allProjects[(index - 1 + total) % total],
		next: allProjects[(index + 1) % total],
	}
}, 'project-details')

const slices = {
	mediaDuo: lazy(() => import('~/slices/MediaDuo')),
}

export default function ProjectPage() {
	const params = useParams()
	const location = useLocation()
	const fetcher = createAsync(() => getProject(params.slug))

	createEffect(() => {
		const el = document.querySelector('[data-page]')
		if (!location.pathname || !el) return

		gsap.to(el, {
			opacity: 1,
			...TRANSITION,
		})

		onPageLeave(el, async () => {
			return await gsap.to(el, {
				opacity: 0,
				...TRANSITION,
			})
		})
	})

	return (
		<SanityPage fetcher={fetcher}>
			{(data) => {
				const [_type, id, dimensions, fileType] =
					data.mainImage?.asset?._id.split('-')

				const [width, height] = dimensions.split('x').map(Number)
				const aspectRatio = Math.round(width / height)
				const maxOgWidth = 1200
				const ogHeight = Math.round(maxOgWidth / aspectRatio)
				const ogImageUrl = `${data.mainImage?.asset?.url}?w=${maxOgWidth}&h=${ogHeight}&format=png`
				return (
					<>
						<PageMeta
							description={data.description}
							title={data.title}
							slug={data.slug.fullUrl}
							imageUrl={ogImageUrl}
							ogImageWidth={maxOgWidth}
							ogImageHeight={ogHeight}
						/>
						<Link rel="preload" href={data.mainImage?.asset?.url} as="image" />
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
						<ProjectNavButtons previous={data.previous} next={data.next} />
					</>
				)
			}}
		</SanityPage>
	)
}
