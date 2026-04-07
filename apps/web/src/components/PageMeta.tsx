import { getDocumentByType } from '@local/sanity'
import { Link, Meta, Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { Show } from 'solid-js'

type PageMetaProps = {
	title: string
	slug: string
	description?: string
	titleOverride?: string
	imageUrl?: string
	ogImageWidth?: number
	ogImageHeight?: number
}

type GlobalMeta = {
	title: string
	description: string
	twitterHandle: string
	siteUrl: string
}

const getGlobalMeta = query(async () => {
	const seo = await getDocumentByType('seo')
	return seo
}, 'global-meta')

export default function PageMeta(props: PageMetaProps) {
	const globalMeta = createAsync(() => getGlobalMeta())

	const imageWidth = props.ogImageWidth || 1200
	const imageHeight = props.ogImageHeight || 630

	return (
		<Show when={globalMeta()}>
			<Show when={!props.titleOverride}>
				<Title>{props.title} • Nathan Nye</Title>
			</Show>
			<Show when={props.titleOverride}>
				<Title>{props.title}</Title>
			</Show>
			<Meta name="og:title" content={props.title} />
			<Meta name="og:type" content="website" />
			<Meta name="og:url" content={`${globalMeta().siteUrl}${props.slug}`} />
			<Meta name="og:locale" content="en_US" />
			<Meta name="og:site_name" content={globalMeta().siteTitle} />
			<Meta name="twitter:card" content="summary_large_image" />
			<Meta name="twitter:site" content={globalMeta().twitterHandle} />
			<Meta name="twitter:creator" content={globalMeta().twitterHandle} />
			<Meta name="twitter:url" content={`${globalMeta().siteUrl}${props.slug}`} />
			<Show when={props.imageUrl}>
				<Meta name="og:image" content={props.imageUrl} />
				<Meta name="og:image:width" content={imageWidth} />
				<Meta name="og:image:height" content={imageHeight} />
				<Meta name="og:image:alt" content="Nathan Nye" />
				<Meta name="og:image:type" content="image/png" />
				<Meta name="twitter:image" content={props.imageUrl} />
			</Show>
			<Meta name="twitter:title" content={props.title} />
			<Link rel="canonical" href={`https://nye.dev${props.slug}`} />
			<Show when={props.description}>
				<Meta name="description" content={props.description} />
				<Meta name="og:description" content={props.description} />
				<Meta name="twitter:description" content={props.description} />
			</Show>
		</Show>
	)
}
