import { getDocumentBySlug, SanityPage } from '@local/sanity'
import { Link, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import gsap from 'gsap'
import { onMount } from 'solid-js'
import CreativeWorkMarkup from '~/components/CreativeWorkMarkup'
import ProjectHero from '~/components/ProjectHero'
import { onPageLeave } from '~/utils'

const getProject = query(async (slug: string) => {
	'use server'
	return await getDocumentBySlug('project', slug, {
		extraQuery:
			'[0]{title, slug, role, stack, year, mainImage, partners, liveLink, _createdAt, _updatedAt}',
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

	return (
		<div ref={el}>
			<SanityPage fetcher={fetcher}>
				{(data) => {
					console.log(data)
					return (
						<div>
							<Title>{data.title} • Nathan Nye</Title>
							<Link rel="canonical" href={`https://nye.dev${data.slug}`} />
							<CreativeWorkMarkup {...data} />
							<ProjectHero {...data} />
						</div>
					)
				}}
			</SanityPage>
		</div>
	)
}
