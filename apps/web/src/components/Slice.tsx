import cx from 'classix'

export default function Slice(props: { children: any }) {
	return (
		<section class={cx('grid-contain px-margin-1', props.class)}>
			{' '}
			{props.children}
		</section>
	)
}
