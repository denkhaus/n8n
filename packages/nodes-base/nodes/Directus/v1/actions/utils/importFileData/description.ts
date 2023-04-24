import { UtilsProperties } from '../../interfaces';

export const importFileDataDescription: UtilsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['importFileData'],
				resource: ['utils'],
			},
		},
		placeholder: 'articles',
		default: '',
		description: 'Unique name of the collection to import the data to',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['importFileData'],
				resource: ['utils'],
			},
		},
		placeholder: '',
		default: '\n',
		description: 'Name of the Binary Property the file is in',
		required: true,
	},
];
