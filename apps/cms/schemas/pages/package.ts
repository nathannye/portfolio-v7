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
		},
		{
			name: 'npmLink',
			title: 'npm Link',
			type: 'url',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
	],
}
