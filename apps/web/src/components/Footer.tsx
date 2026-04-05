import { createSignal, onMount } from 'solid-js'

export default function Footer() {
	const [year, setYear] = createSignal<number | null>(null)

	onMount(() => {
		setYear(new Date().getFullYear())
	})

	return (
		<footer class="px-margin-1">
			<div class="lg:pl-grid-3-w lg:pr-grid-6-w border-t border-inverted/10 pt-150">
				<p class="max-lg:!text-[3.7rem] heading-4">
					Got something crazy in mind? <br />
					My inbox is open!{' '}
					<a href="mailto:nathan@nye.dev" class="underline text-accent">
						nathan@nye.dev
					</a>{' '}
				</p>
			</div>

			<div class="flex max-lg:flex-wrap gap-y-10 pt-140 w-full pb-4 eyebrow">
				<div
					aria-hidden="true"
					class="opacity-50 shrink-0 max-lg:hidden w-grid-2-w"
				>
					v7
				</div>

				<div class="w-full shrink-0 lg:w-grid-6-w">
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
					<div class="w-grid-2 text-right shrink-0">© {year()}</div>
				</div>
			</div>
		</footer>
	)
}
