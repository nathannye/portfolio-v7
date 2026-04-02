import { For } from 'solid-js'

type HomeHeroProps = {
	headline: string
	blurb: string
}

export default function HomeHero(props: HomeHeroProps) {
	const parts = () => props.headline.split(/(\{[^}]+\})/)

	return (
		<header class="pt-[28vh] lg:pt-[25vh] mb-120 px-margin-1">
			<h1 class="heading-3 lg:px-grid-3-w">
				<For each={parts()}>
					{(part) => {
						const match = part.match(/^\{([^}]+)\}$/)
						return match ? (
							<span class="text-accent font-medium">{match[1]}</span>
						) : (
							part
						)
					}}
				</For>
			</h1>
			<p class="body-1 opacity-70 mt-44 lg:w-grid-5 lg:ml-grid-3-w max-lg:pr-grid-1">
				{props.blurb}
			</p>
		</header>
	)
}
