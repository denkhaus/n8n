import { ItemsProperties } from '../../interfaces';

export const deleteDescription: ItemsProperties = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['delete'],
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
				operation: ['delete'],
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
