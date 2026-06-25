import { A, createAsync, query } from '@solidjs/router'
import { createEffect, For, Show } from 'solid-js'
import { listItemAnimation } from '~/animations/list-item'
import ListItem from './ListItem'

type PackageListItemProps = {
	title: string
	githubLink: string
	npmLink: string
	description: string
}

const ExternalLink = (props: { href: string; label: string }) => {
	return (
		<A href={props.href} target="_blank" rel="noopener noreferrer">
			{props.label}{' '}
			<span class="inline-block translate-y-1 translate-x-2"> ↗ </span>
		</A>
	)
}

const getNpmPackage = query(async (packageName: string) => {
	'use server'

	const response = await fetch(`https://registry.npmjs.org/${packageName}`)
	const data = await response.json()

	return data
}, 'npm-package')

export default function PackageListItem(props: PackageListItemProps) {
	const npmPackage = createAsync(() => getNpmPackage(props.packageName))

	createEffect(() => {
		console.log({ npmPackage: npmPackage() })
	})

	return (
		<Show when={npmPackage()}>
			{(npm) => {
				const latestVersion = npm()['dist-tags'].latest

				return (
					<ListItem index={props.index}>
						<div class="pt-17 lg:pt-10 flex gap-y-5 items-baseline pb-40 lg:pb-20 w-full">
							<div class="w-grid-4 lg:w-grid-3-w lg:pr-gutter-1 shrink-0">
								<h3 data-fade class="heading-5 lg:text-balance">
									{props.title}{' '}
									<span class="lg:hidden inline-block text-accent ml-5 eyebrow font-mono">
										{latestVersion}
									</span>
								</h3>
								<p class="opacity-50 eyebrow mt-3">{props.packageName}</p>
							</div>
							<div class="opacity-50 max-lg:hidden eyebrow font-mono w-grid-3-w">
								{latestVersion}
							</div>
							<div class="w-full lg:flex lg:w-grid-2-w">
								<Show when={props.githubLink}>
									<div class="hover:text-accent lg:w-grid-1-w duration-225 shrink-0 eyebrow">
										<ExternalLink href={props.githubLink} label="GitHub" />
									</div>
								</Show>
								<Show when={props.npmLink}>
									<div class="hover:text-accent lg:w-grid-2-w duration-225 shrink-0 eyebrow">
										<ExternalLink href={props.npmLink} label="npm" />
									</div>
								</Show>
							</div>
						</div>
					</ListItem>
				)
			}}
		</Show>
	)
}
