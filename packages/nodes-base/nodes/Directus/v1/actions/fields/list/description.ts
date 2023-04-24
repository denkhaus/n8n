import { globalDescr } from '../../../descriptions';
import { FieldsProperties } from '../../interfaces';

export const listDescription: FieldsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['fields'],
			},
		},
		placeholder: 'articles',
		default: '',
		description: 'The collection name',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
	},

	...globalDescr.splitIntoItems('fields', 'list'),
];
