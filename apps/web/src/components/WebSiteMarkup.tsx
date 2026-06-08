import { DOMAIN } from '~/config'

export default function WebSiteMarkup() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'https://schema.org',
					'@id': `${DOMAIN}/#person`,
					'@type': 'Person',
					name: 'Nathan Nye',
					url: DOMAIN,
					jobTitle: 'Frontend Engineer',
					description:
						'Freelance creative/frontend developer specializing in large-scale CMS builds, e-commerce, and interactive experiences.',
					sameAs: ['https://github.com/nathannye'],
				})}
			</script>
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: 'Nathan Nye – Frontend Engineer',
					url: DOMAIN,
					description:
						'Frontend engineer building everything from award-winning marketing sites to sprawling CMS platforms. Focused on ambitious web projects that need to survive the real world.',
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
}
