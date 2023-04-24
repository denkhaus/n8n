import { CollectionsProperties } from '../../interfaces';

export const getDescription: CollectionsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['get'],
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
