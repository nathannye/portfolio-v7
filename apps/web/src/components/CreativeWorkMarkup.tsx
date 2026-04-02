import type { SanityImageAssetDocument } from '@sanity/client'

export default function CreativeWorkMarkup(props: {
	title: string
	_createdAt: string
	_updatedAt: string
	stack: string[]
	mainImage: SanityImageAssetDocument
}) {
	return (
		<script type="application/ld+json">
			{JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'CreativeWork',
				name: props.title,
				url: 'https://example.com/projects/avaline',
				// description:
				// 	'A full redesign and rebuild of the Avaline website with a focus on performance, accessibility, and a flexible headless CMS.',
				inLanguage: 'en',
				author: {
					'@id': 'https://nye.dev/#person',
				},
				creator: {
					'@id': 'https://nye.dev/#person',
				},
				publisher: {
					'@id': 'https://nye.dev/#person',
				},
				dateCreated: props._createdAt,
				datePublished: props._createdAt,
				dateModified: props._updatedAt,
				// headline: props.headline,
				keywords: [...props.stack],
				thumbnailUrl: props.mainImage.asset.url,
				// image: [
				// 	'https://example.com/images/projects/avaline/cover.jpg',
				// 	'https://example.com/images/projects/avaline/homepage.jpg',
				// 	'https://example.com/images/projects/avaline/product-page.jpg',
				// // ],
				// about: {
				// 	'@type': 'Thing',
				// 	name: 'Drink Avaline',
				// 	url: 'https://drinkavaline.com',
				// },
			})}
		</script>
	)
}
