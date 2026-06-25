import { FaBox } from 'react-icons/fa'

export default {
	name: 'package',
	icon: FaBox,
	title: 'Package',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'packageName',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'githubLink',
			title: 'GitHub Link',
			type: 'url',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'npmLink',
			title: 'npm Link',
			type: 'url',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
	],
}
