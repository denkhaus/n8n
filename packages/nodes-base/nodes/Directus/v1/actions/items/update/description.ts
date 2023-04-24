import type { ItemsProperties } from '../../interfaces';

export const updateDescription: ItemsProperties = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['items'],
			},
		},
		placeholder: '15',
		default: '',
		description: 'Unique ID of the file object',
		required: true,
	},
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['update'],
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
				operation: ['update'],
				resource: ['items'],
			},
		},
		placeholder: '{\n	"title": "Hello world!",\n	"body": "This is our first article"\n}',
		default: null,
		description:
			'The partial [item object](https://docs.directus.io/reference/api/items/#the-item-object)',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
];
