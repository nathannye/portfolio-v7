import { getDocumentByType } from '@local/sanity'
import { Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { For } from 'solid-js'
import ListSection from '~/components/ListSection'
import ProjectListItem from '~/components/ProjectListItem'

const getProjects = query(() => {
	return getDocumentByType('project', {
		extraQuery:
			'{title, slug, year, mainImage, slug, "partners": partners[]->name} | order(year desc)',
	})
}, 'projects')

export default function Home() {
	const projects = createAsync(() => getProjects())
	return (
		<>
			<Title>Nathan Nye • Creative Developer</Title>
			<header class="pt-[25vh] mb-120 px-margin-1">
				<h1 class="heading-3 px-grid-3-w">
					Hey, I'm <span class="text-accent font-medium">Nathan!</span> A creative
					developer & designer obsessed with CMS-driven web projects brought to life
					with kick-ass animation.{' '}
				</h1>
				<p class="body-1 opacity-70 mt-44 w-grid-5 ml-grid-3-w">
					I’ve worked with dozens of agencies and brands worldwide bringing
					first-class visuals and motion to large-scale headless systems on Sanity.io
					and Contentful
				</p>
			</header>
			<ListSection title="The Good Stuff" itemCount={projects()?.length}>
				<ul>
					<For each={projects()}>
						{(project) => <ProjectListItem {...project} />}
					</For>
				</ul>
			</ListSection>
		</>
	)
}
