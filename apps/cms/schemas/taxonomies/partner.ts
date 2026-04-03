import { IoBusiness } from 'react-icons/io5'

export default {
	name: 'partner',
	type: 'document',
	title: 'Partner',
	icon: IoBusiness,
	fields: [
		{
			name: 'name',
			type: 'string',
			title: 'Name',
		},
		{
			name: 'country',
			type: 'string',
			options: {
				list: [
					{
						title: 'Czech Republic',
						value: 'cz',
					},
					{
						title: 'Germany',
						value: 'de',
					},
					{
						title: 'United States',
						value: 'us',
					},
					{
						title: 'United Kingdom',
						value: 'uk',
					},
					{
						title: 'France',
						value: 'fr',
					},
					{
						title: 'Italy',
						value: 'it',
					},
					{
						title: 'Netherlands',
						value: 'nl',
					},
					{
						title: 'Turkey',
						value: 'tr',
					},
					{
						title: 'Portugal',
						value: 'pt',
					},
				].sort((a, b) => a.title.localeCompare(b.title)),
			},
		},
	],
}
