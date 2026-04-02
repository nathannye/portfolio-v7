import { getDocumentBySlug, SanityPage } from '@local/sanity'
import { Link, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import CreativeWorkMarkup from '~/components/CreativeWorkMarkup'
import ProjectHero from '~/components/ProjectHero'

const getProject = query(async (slug: string) => {
	return await getDocumentBySlug('project', slug, {
		extraQuery:
			'[0]{title, slug, role, stack, year, mainImage, "partners": partners[]->name, _createdAt, _updatedAt}',
	})
}, 'project-details')

export default function ProjectPage({ params }) {
	const fetcher = createAsync(() => getProject(params.slug))

	return (
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
	)
}
