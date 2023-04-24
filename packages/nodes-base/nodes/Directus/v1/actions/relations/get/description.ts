import { RelationsProperties } from '../../interfaces';

export const getDescription: RelationsProperties = [
	{
		displayName: 'Collection Name',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['relations'],
			},
		},
		placeholder: 'books',
		default: '',
		description: 'Unique name of the parent collection',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
	},
	{
		displayName: 'Field',
		name: 'field',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['relations'],
			},
		},
		placeholder: 'author',
		default: '',
		description:
			'Name of the field that holds the related primary key. This matches the column name in the database.',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getRelationalFields',
			loadOptionsDependsOn: ['collection'],
		},
	},
];
