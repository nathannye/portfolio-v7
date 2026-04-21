import { For } from 'solid-js'

type HomeHeroProps = {
	headline: string
	blurb: string
}

export default function HomeHero(props: HomeHeroProps) {
	const parts = () => props.headline.split(/(\{[^}]+\})/)

	return (
		<header class="pt-[20vh] lg:pt-[24vh] mb-110 px-margin-1">
			<h1 class="heading-3 lg:pl-grid-3-w lg:pr-grid-3-w">
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
			<p class="body-1 opacity-85 whitespace-pre-line mt-44 lg:w-grid-6 lg:ml-grid-3-w ">
				{props.blurb}
			</p>
		</header>
	)
}
