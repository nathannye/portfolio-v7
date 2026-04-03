type MarginHeroProps = {
	title: string
	firstPublished: string
}

export default function MarginHero(props: MarginHeroProps) {
	return (
		<header class="px-margin-1 pt-[15vh] pb-[10vh]">
			<h1 class="heading-3 lg:pl-grid-2-w lg:pr-grid-5-w">{props.title}</h1>
		</header>
	)
}
