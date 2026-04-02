import { createSignal, onMount } from 'solid-js'

export default function Footer() {
	const [year, setYear] = createSignal<number | null>(null)

	onMount(() => {
		setYear(new Date().getFullYear())
	})

	return (
		<footer class="px-margin-1 flex justify-between pt-140 w-full pb-4 eyebrow">
			<div aria-hidden="true" class="opacity-90">
				v7
			</div>
			<div class="flex opacity-90">
				<div class="w-grid-2-w shrink-0">Face • Acid Grotesk</div>
				<div class="w-grid-2-w shrink-0">Solid Start • Sanity</div>
				<div class="w-grid-1 text-right shrink-0">© {year()}</div>
			</div>
		</footer>
	)
}
