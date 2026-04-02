import { getDocumentByType } from '@local/sanity'
import { Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { For } from 'solid-js'
import ListSection from '~/components/ListSection'
import ProjectListItem from '~/components/ProjectListItem'

const getProjects = query(() => {
	return getDocumentByType('project', {
		extraQuery:
			'{title, slug, year, mainImage, slug, awards, press, partners} | order(year desc)',
	})
}, 'projects')

export default function Home() {
	const projects = createAsync(() => getProjects())
	return (
		<>
			<Title>Nathan Nye • Creative Developer</Title>
			<header class="pt-[25vh] mb-120 px-margin-1">
				<h1 class="heading-3 lg:px-grid-3-w">
					Hey, I'm <span class="text-accent font-medium">Nathan!</span> A creative
					developer & designer obsessed with CMS-driven web projects brought to life
					with kick-ass animation.
				</h1>
				<p class="body-1 opacity-70 mt-44 lg:w-grid-5 lg:ml-grid-3-w max-lg:pr-grid-1">
					I’ve worked with dozens of agencies and brands worldwide bringing
					first-class visuals and motion to large-scale headless systems on Sanity.io
					and Contentful
				</p>
			</header>
			<ListSection title="The Good Stuff" itemCount={projects()?.length}>
				<div class="mt-10">
					<div class="flex pb-50 max-lg:hidden eyebrow opacity-50">
						<div class="w-grid-3-w">Name</div>
						<div class="w-grid-2-w">Partners in Crime</div>
						<div class="w-grid-2-w">Kudos</div>
						<div class="w-grid-2-w">Press</div>
					</div>
					<ul>
						<For each={projects()}>
							{(project) => <ProjectListItem {...project} />}
						</For>
					</ul>
				</div>
			</ListSection>
		</>
	)
}
