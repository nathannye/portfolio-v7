import { getDocumentBySlug, SanityPage } from '@local/sanity'
import { Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import ProjectHero from '~/components/ProjectHero'

const getProject = query(async (slug: string) => {
	return await getDocumentBySlug('project', slug, {
		extraQuery:
			'[0]{title, slug, role, stack, year, mainImage, "partners": partners[]->name}',
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
						<ProjectHero {...data} />
					</div>
				)
			}}
		</SanityPage>
	)
}
