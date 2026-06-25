import { SanityPage } from '@local/sanity'
import { getDocumentByType } from '@local/sanity/server'
import { createAsync, query, useLocation } from '@solidjs/router'
import gsap from 'gsap'
import { createEffect, For } from 'solid-js'
import HomeHero from '~/components/HomeHero'
import ItemListWrapper from '~/components/ItemListWrapper'
import ListSection from '~/components/ListSection/ListSection'
import MarginListItem from '~/components/MarginListItem'
import PackageListItem from '~/components/PackageListItem'
import PageMeta from '~/components/PageMeta'
import ProjectListItem from '~/components/ProjectListItem'
import { DOMAIN } from '~/config'
import { onPageLeave, TRANSITION } from '~/utils'

const getData = query(async () => {
	'use server'

	const projects = getDocumentByType('project', {
		extraQuery:
			'{title, slug, year, mainImage, slug, awards, press, partners} | order(year desc)',
	})

	const margins = getDocumentByType('margin', {
		filter: ' && defined(slug.fullUrl)',
		extraQuery:
			'{title, slug, firstPublished, "tags":tags[]->name} | order(firstPublished desc)',
	})

	const packages = getDocumentByType('package', {
		extraQuery:
			'{title, githubLink, npmLink, description, packageName} | order(title asc)',
	})

	const page = getDocumentByType('home', {
		extraQuery: '[0]{headline, blurb}',
	})

	return await Promise.all([projects, margins, packages, page])
}, 'home')

export default function Home() {
	const data = createAsync(() => getData())
	const location = useLocation()
	let el: HTMLElement | undefined

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
		<div ref={el}>
			<SanityPage fetcher={data}>
				{(d) => {
					const [projects, margins, packages, page] = d

					return (
						<>
							<PageMeta
								titleOverride="Nathan Nye • Frontend Engineer"
								description="Frontend engineer building everything from award-winning marketing sites to sprawling CMS platforms. Focused on ambitious web projects that need to survive the real world."
								title="Nathan Nye • Frontend Engineer"
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
										<ItemListWrapper>
											<For each={projects}>
												{(project, i) => <ProjectListItem {...project} index={i() - 4} />}
											</For>
										</ItemListWrapper>
									</div>
								</ListSection>
								<ListSection index={1} title="Writing" itemCount={margins.length}>
									<div class="flex pb-50 mt-10 max-lg:hidden eyebrow opacity-50">
										<div data-header class="w-grid-3-w opacity-0">
											Title
										</div>
										<div data-header class="w-grid-2-w opacity-0">
											Published
										</div>
										<div data-header class="w-grid-3-w opacity-0">
											Topics
										</div>
									</div>
									<ItemListWrapper>
										<For each={margins}>
											{(margin, i) => <MarginListItem {...margin} index={i()} />}
										</For>
									</ItemListWrapper>
								</ListSection>
								<ListSection index={2} title="OSS Packages" itemCount={packages.length}>
									<div class="flex pb-50 mt-10 max-lg:hidden eyebrow opacity-50">
										<div data-header class="w-grid-3-w opacity-0">
											Title
										</div>
										<div data-header class="w-grid-2-w opacity-0">
											GitHub
										</div>
										<div data-header class="w-grid-3-w opacity-0">
											npm
										</div>
									</div>
									<ItemListWrapper>
										<For each={packages}>
											{(pkg, i) => <PackageListItem {...pkg} index={i()} />}
										</For>
									</ItemListWrapper>
								</ListSection>
							</div>
						</>
					)
				}}
			</SanityPage>
		</div>
	)
}
