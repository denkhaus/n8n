import { globalDescr } from '../../../descriptions';
import type { ItemsProperties } from '../../interfaces';

export const getDescription: ItemsProperties = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['get'],
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
				operation: ['get'],
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
	...globalDescr.returnAll('items', 'get'),
	...globalDescr.limit('items', 'get'),
	...globalDescr.additionalFields('items', 'get'),
];
