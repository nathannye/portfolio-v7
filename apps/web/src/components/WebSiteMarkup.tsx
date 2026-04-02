export default function WebSiteMarkup() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'https://schema.org',
					'@id': 'https://nye.dev/#person',
					'@type': 'Person',
					name: 'Nathan Nye',
					url: 'https://nye.dev',
					jobTitle: 'Creative Developer',
					description:
						'Freelance creative/frontend developer specializing in large-scale CMS builds, e-commerce, and interactive experiences.',
					sameAs: ['https://github.com/nathannye'],
				})}
			</script>
			<script type="application/ld+json">
				{JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: 'Nathan Nye – Creative Developer',
					url: 'https://nye.dev',
					description:
						'Portfolio of creative developer Nathan Nye, showcasing web projects, interactive experiences, and frontend engineering work.',
					inLanguage: 'en',
					author: {
						'@id': 'https://nye.dev/#person',
					},
					publisher: {
						'@id': 'https://nye.dev/#person',
					},
				})}
			</script>
		</>
	)
}
