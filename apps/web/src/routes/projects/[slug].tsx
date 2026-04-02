import { getDocumentBySlug, SanityPage } from '@local/sanity'
import { Link, Meta, Title } from '@solidjs/meta'
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
						{/* <script type="application/ld+json">
							{JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'WebSite',
								name: 'Nathan Nye – Creative Developer',
								url: 'https://example.com',
								description:
									'Portfolio of creative developer Nathan Nye, showcasing web projects, interactive experiences, and frontend engineering work.',
								inLanguage: 'en',
								author: {
									'@type': 'Person',
									name: 'Nathan Nye',
									url: 'https://example.com',
									jobTitle: 'Creative Developer',
									sameAs: ['https://github.com/nathannye', 'https://twitter.com/bn_pne'],
								},
								publisher: {
									'@type': 'Person',
									name: 'Nathan Nye',
								},
							})}
						</script> */}
					</div>
				)
			}}
		</SanityPage>
	)
}
