import { CollectionsProperties } from '../../interfaces';

export const deleteDescription: CollectionsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['collections'],
			},
		},
		placeholder: 'articles',
		default: '',
		description: 'Unique name of the collection',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
	},
];
