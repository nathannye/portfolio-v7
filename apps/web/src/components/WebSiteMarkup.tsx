import { createAsync } from '@solidjs/router'
import { Show } from 'solid-js'
import { DOMAIN } from '~/config'
import { getGlobalSeo, resolveSeo } from '~/queries/seo'

export default function WebSiteMarkup() {
	const seo = createAsync(() => getGlobalSeo())

	return (
		<Show when={seo()}>
			{(data) => {
				const resolved = () => resolveSeo(data())

				return (
					<>
						<script type="application/ld+json">
							{JSON.stringify({
								'@context': 'https://schema.org',
								'@id': `${DOMAIN}/#person`,
								'@type': 'Person',
								name: resolved().siteTitle,
								url: DOMAIN,
								jobTitle: resolved().jobTitle,
								description: resolved().bio,
								sameAs: ['https://github.com/nathannye'],
							})}
						</script>
						<script type="application/ld+json">
							{JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'WebSite',
								name: resolved().websiteName,
								url: DOMAIN,
								description: resolved().metaDescription,
								inLanguage: 'en',
								author: {
									'@id': `${DOMAIN}/#person`,
								},
								publisher: {
									'@id': `${DOMAIN}/#person`,
								},
							})}
						</script>
					</>
				)
			}}
		</Show>
	)
}
