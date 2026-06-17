export default {
	name: 'package',
	title: 'Package',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
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
