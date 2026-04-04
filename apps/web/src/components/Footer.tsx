import { createSignal, onMount } from 'solid-js'

export default function Footer() {
	const [year, setYear] = createSignal<number | null>(null)

	onMount(() => {
		setYear(new Date().getFullYear())
	})

	return (
		<footer class="mt-90 px-margin-1">
			<div class="pl-grid-3-w pr-grid-6-w border-t border-inverted/10 pt-90">
				<p class="heading-4">
					Got something crazy? <br />
					Shoot me an email{' '}
					<a href="mailto:nathan@nye.dev" class="underline text-accent">
						nathan@nye.dev
					</a>{' '}
				</p>
			</div>

			<div class="flex max-lg:flex-wrap gap-y-10 justify-between pt-140 w-full pb-4 eyebrow">
				<div aria-hidden="true" class="opacity-90 max-lg:hidden w-grid-3-w">
					v7
				</div>

				<div class="w-full shrink-0lg:w-grid-6-w">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/nathannye"
						class="underline"
					>
						GitHub
					</a>
				</div>
				<div class="flex opacity-90">
					<div class="w-grid-2-w shrink-0">Face • Acid Grotesk</div>
					<div class="w-grid-2-w shrink-0">Solid Start • Sanity</div>
					<div class="w-grid-1 text-right shrink-0">© {year()}</div>
				</div>
			</div>
		</footer>
	)
}
