import cx from 'classix'
import { createSignal, onMount } from 'solid-js'
import { useCopyEmail } from '~/hooks/useCopyEmail'

export default function Footer() {
	const [year, setYear] = createSignal<number | null>(null)
	const { copied, copyText, handleCopy, copyCount } = useCopyEmail()

	onMount(() => {
		setYear(new Date().getFullYear())
	})

	return (
		<footer class="px-margin-1">
			<div class="lg:pl-grid-3-w lg:pr-grid-6-w border-t border-inverted/10 pt-150">
				<p class="max-lg:!text-[3.7rem] heading-4">
					Got something crazy in mind? <br />
					My inbox is open!{' '}
					<button
						type="button"
						onClick={handleCopy}
						class="underline text-accent relative cursor-pointer"
					>
						<div class={cx('relative z-1 duration-200', copied() && 'opacity-0 ')}>
							nathan@nye.dev
						</div>
						<div
							class={cx(
								'opacity-0 whitespace-nowrap text-accent duration-200 absolute top-0 left-0',
								copied() && 'opacity-100',
							)}
						>
							{copyText()}
						</div>
					</button>
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
					<div class="w-grid-1 lg:w-grid-2 text-right shrink-0">© {year()}</div>
				</div>
			</div>
		</footer>
	)
}
