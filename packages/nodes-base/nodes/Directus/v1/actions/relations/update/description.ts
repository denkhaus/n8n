import type { RelationsProperties } from '../../interfaces';

export const updateDescription: RelationsProperties = [
	{
		displayName: 'Field',
		name: 'field',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['update'],
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
	{
		displayName: 'Data (JSON)',
		name: 'data',
		type: 'json',
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['relations'],
			},
		},
		placeholder: '{\n	"meta": {\n		"one_field": "articles"\n	}\n}',
		default: null,
		description:
			'A partial [relation object](https://docs.directus.io/reference/api/system/relations/#the-relation-object)',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
	},
	{
		displayName: 'Collection Name',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['update'],
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
];
