import { FieldsProperties } from '../../interfaces';

export const deleteDescription: FieldsProperties = [
	{
		displayName: 'Field',
		name: 'field',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['fields'],
			},
		},
		placeholder: '',
		default: '',
		description: 'Unique name of the field. Field name is unique within the collection.',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getFieldsInCollection',
		},
	},
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['delete'],
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
];
