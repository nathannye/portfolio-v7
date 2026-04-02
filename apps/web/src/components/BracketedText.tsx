import cx from 'classix'

export default function BracketedText(props: { children: string }) {
	return (
		<div class={cx('inline-flex text-accent items-center gap-x-14', props.class)}>
			<span>{'['}</span>
			<span class="inline-block">{props.children}</span>
			<span>{']'}</span>
		</div>
	)
}
