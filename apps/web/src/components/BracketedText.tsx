import cx from 'classix'
import type { JSX } from 'solid-js'

type BracketedTextProps = {
	children: JSX.Element
	class?: string
}

export default function BracketedText(props: BracketedTextProps) {
	return (
		<div
			data-bracketed
			class={cx(
				'inline-flex font-[155] text-accent items-center gap-x-20 lg:gap-x-14',
				props.class,
			)}
		>
			<span data-bracket-open class="opacity-0">
				{'['}
			</span>
			<span data-bracket-text class="inline-block opacity-0">
				{props.children}
			</span>
			<span data-bracket-close class="opacity-0">
				{']'}
			</span>
		</div>
	)
}
