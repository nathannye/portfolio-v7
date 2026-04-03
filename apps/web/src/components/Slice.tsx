import cx from 'classix'

export default function Slice(props: { children: any; class?: string }) {
	return <section class={props.class}> {props.children}</section>
}
