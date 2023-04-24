import { globalDescr } from '../../../descriptions';
import type { ItemsProperties } from '../../interfaces';

export const listDescription: ItemsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['list'],
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
	...globalDescr.listDefault('items', 'list'),
];
