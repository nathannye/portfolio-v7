import { mouse } from '~/stores/mouseStore'

export default function ProjectImageTracker() {
	return (
		<div
			style={{
				transform: `translateX(${mouse.x * 100}%) translateY(${mouse.y * 100}%)`,
			}}
			data-gl="project-image-tracker"
			class="fixed top-1/2 left-1/2 w-grid-3 aspect-[1/1.2]"
		/>
	)
}
