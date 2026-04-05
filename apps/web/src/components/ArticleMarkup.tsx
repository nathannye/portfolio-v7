import { DOMAIN } from '~/config'

type ArticleMarkupProps = {
	title: string
	description: string
	_updatedAt: string
	datePublished: string
	keywords: string[]
}

export default function ArticleMarkup(props: ArticleMarkupProps) {
	return (
		<script type="application/ld+json">
			{JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: props.title,
				description: props.description ? props.description : '',
				author: {
					'@type': 'Person',
					name: 'Nathan Nye',
					email: 'nathan@nye.dev',
					url: 'https://nye.dev',
				},
				publisher: {
					'@id': `${DOMAIN}/#person`,
				},
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': `${DOMAIN}/#webpage`,
				},
				datePublished: props.datePublished,
				dateModified: props._updatedAt,
				inLanguage: 'en',
				articleSection: 'Blog',
				keywords: props.keywords?.length ? props.keywords : [],
			})}
		</script>
	)
}
