import { globalDescr } from '../../../descriptions';
import { RelationsProperties } from '../../interfaces';

export const listDescription: RelationsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['relations'],
			},
		},
		placeholder: 'articles',
		default: '',
		description: 'Unique name of the parent collection',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
	},
	...globalDescr.splitIntoItems('relations', 'list'),
];
