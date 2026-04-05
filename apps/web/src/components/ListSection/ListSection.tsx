import cx from 'classix'
import type { JSX } from 'solid-js'
import { listSectionAnimation } from '~/animations/list-section'
import BracketedText from '../BracketedText'
import CounterBoxes from '../CounterBoxes'
import styles from './list-section.module.css'

type ListSectionProps = {
	title: string
	itemCount: number
	children: JSX.Element
	index: number
}

export default function ListSection(props: ListSectionProps) {
	return (
		<section
			data-index={props.index}
			use:listSectionAnimation
			class="px-margin-1"
		>
			<div
				data-wrapper
				style={{
					'--before-progress': 0,
					'--after-progress': 0,
					'--before-translate': '0%',
				}}
				class={cx(
					'flex items-start overflow-hidden relative pt-2 after:bg-inverted/30 flex-col lg:flex-row gap-y-40',
					styles['list-section'],
				)}
			>
				<div class="max-lg:w-full">
					<h2 class="w-full flex max-lg:justify-between lg:w-grid-3-w font-[160] mt-9 eyebrow shrink-0">
						<span data-stagger class="inline-block">
							{props.title}
						</span>

						<BracketedText class="ml-15">{props.itemCount}</BracketedText>
					</h2>
					<CounterBoxes count={props.itemCount} />
				</div>
				<div class="w-full">{props.children}</div>
			</div>
		</section>
	)
}
