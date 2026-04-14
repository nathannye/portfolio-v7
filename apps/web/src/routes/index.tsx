import { getDocumentByType, SanityPage } from '@local/sanity'
import { createAsync, query } from '@solidjs/router'
import { For } from 'solid-js'
import HomeHero from '~/components/HomeHero'
import ListSection from '~/components/ListSection/ListSection'
import MarginListItem from '~/components/MarginListItem'
import PageMeta from '~/components/PageMeta'
import ProjectListItem from '~/components/ProjectListItem'
import { DOMAIN } from '~/config'

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
		<div ref={el} class="opacity-0">
			<SanityPage fetcher={data}>
				{(d) => {
					const [projects, margins, page] = d
					return (
						<>
							<PageMeta
								titleOverride="Nathan Nye • Creative Developer"
								description="Creative developer and designer obsessed with CMS-driven web projects brought to life with kick-ass animation. Working with agencies and brands worldwide."
								title="Nathan Nye • Creative Developer"
								slug="/"
								imageUrl={`${DOMAIN}/og.png`}
								ogImageWidth={1200}
								ogImageHeight={600}
							/>

							<HomeHero {...page} />
							<div class="w-full flex mb-90 flex-col gap-y-95">
								<ListSection index={0} title="Work" itemCount={projects.length}>
									<div class="mt-10">
										<div class="flex pb-50 max-lg:hidden eyebrow opacity-50">
											<div data-header class="w-grid-3-w opacity-0">
												Title
											</div>
											<div data-header class="w-grid-2-w opacity-0">
												Partners in Crime
											</div>
											<div data-header class="w-grid-2-w opacity-0">
												Kudos
											</div>
											<div data-header class="w-grid-2-w opacity-0">
												Press
											</div>
										</div>
										<ul>
											<For each={projects}>
												{(project, i) => <ProjectListItem {...project} index={i()} />}
											</For>
										</ul>
									</div>
								</ListSection>
								<ListSection index={1} title="Margins" itemCount={margins.length}>
									<div class="flex pb-50 mt-10 max-lg:hidden eyebrow opacity-50">
										<div data-header class="w-grid-3-w opacity-0">
											Title
										</div>
										<div data-header class="w-grid-2-w opacity-0">
											Published
										</div>
										<div data-header class="w-grid-3-w opacity-0">
											Category
										</div>
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
