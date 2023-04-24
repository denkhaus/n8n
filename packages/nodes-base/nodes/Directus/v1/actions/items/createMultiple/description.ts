import { ItemsProperties } from '../../interfaces';

export const createMultipleDescription: ItemsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['createMultiple'],
				resource: ['items'],
			},
		},
		placeholder: 'articles',
		default: '',
		description: 'Unique name of the parent collection',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCustomCollections',
		},
	},
	{
		displayName: 'Data (JSON)',
		name: 'data',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['createMultiple'],
				resource: ['items'],
			},
		},
		placeholder:
			'[\n	{\n		"title": "Hello world!",\n		"body": "This is our first article"\n	},\n	{\n		"title": "Hello again, world!",\n		"body": "This is our second article"\n	}\n]',
		default: null,
		description: 'An array of partial [item objects](https://docs.directus.io/reference/api/items/#the-item-object)',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
];
