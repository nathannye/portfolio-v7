import { MdCategory } from "react-icons/md";

export default {
	name: 'category',
	title: 'Category',
	type: 'document',
	icon: MdCategory,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
	],
}