import cx from 'classix'

export default function Slice(props: { children: any }) {
	return <section class={props.class}> {props.children}</section>
}
