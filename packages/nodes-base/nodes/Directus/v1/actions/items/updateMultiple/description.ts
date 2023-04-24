import { ItemsProperties } from '../../interfaces';

export const updateMultipleDescription: ItemsProperties = [
	{
		displayName: 'Data (JSON)',
		name: 'data',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['updateMultiple'],
				resource: ['items'],
			},
		},
		placeholder: '{\n	"keys": [1, 2],\n	"data": {\n		"status": "published"\n	}\n}',
		default: null,
		description: 'An array of partial [item objects](https://docs.directus.io/reference/api/items/#the-item-object)',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['updateMultiple'],
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
];
