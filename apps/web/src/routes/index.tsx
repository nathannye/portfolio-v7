import { getDocumentByType, SanityPage } from '@local/sanity'
import { Meta, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { For, Show } from 'solid-js'
import HomeHero from '~/components/HomeHero'
import ListSection from '~/components/ListSection'
import MarginListItem from '~/components/margin/MarginListItem'
import ProjectListItem from '~/components/project/ProjectListItem'

const getData = query(async () => {
	'use server'

	const projects = getDocumentByType('project', {
		extraQuery:
			'{title, slug, year, mainImage, slug, awards, press, partners} | order(year desc)',
	})

	const margins = getDocumentByType('margin', {
		extraQuery:
			'{title, slug, firstPublished, "tags":tags[]->name} | order(firstPublished desc)',
	})

	const page = getDocumentByType('home', {
		extraQuery: '[0]{headline, blurb}',
	})

	return await Promise.all([projects, margins, page])
}, 'projects')

export default function Home() {
	let el
	const data = createAsync(() => getData())

	return (
		<div ref={el}>
			<SanityPage fetcher={data}>
				{(d) => {
					const [projects, margins, page] = d
					return (
						<>
							<Title>Nathan Nye • Creative Developer</Title>
							<Meta
								name="description"
								content="Creative developer and designer obsessed with CMS-driven web projects brought to life with kick-ass animation. Working with agencies and brands worldwide."
							/>
							<Show when={page}>
								<HomeHero {...page} />
							</Show>

							<div class="w-full flex flex-col gap-y-95">
								<ListSection title="Work" itemCount={projects.length}>
									<div class="mt-10">
										<div class="flex pb-50 max-lg:hidden eyebrow opacity-50">
											<div class="w-grid-3-w">Title</div>
											<div class="w-grid-2-w">Partners in Crime</div>
											<div class="w-grid-2-w">Kudos</div>
											<div class="w-grid-2-w">Press</div>
										</div>
										<ul>
											<For each={projects}>
												{(project, i) => <ProjectListItem {...project} index={i()} />}
											</For>
										</ul>
									</div>
								</ListSection>
								<ListSection title="Margins" itemCount={margins.length}>
									<div class="flex pb-50 mt-10 max-lg:hidden eyebrow opacity-50">
										<div class="w-grid-3-w">Title</div>
										<div class="w-grid-2-w">Published</div>
										<div class="w-grid-3-w">Category</div>
									</div>
									<div class="mt-10">
										<ul>
											<For each={margins}>
												{(margin, i) => <MarginListItem {...margin} index={i()} />}
											</For>
										</ul>
									</div>
								</ListSection>
							</div>
						</>
					)
				}}
			</SanityPage>
		</div>
	)
}
