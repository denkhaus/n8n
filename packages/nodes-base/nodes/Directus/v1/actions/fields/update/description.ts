import { globalDescr } from '../../../descriptions';
import type { FieldsProperties } from '../../interfaces';

export const updateDescription: FieldsProperties = [
	...globalDescr.jsonParameters('fields', 'update'),
	...globalDescr.bodyParametersJson('fields', 'update'),
	{
		displayName: 'Field',
		name: 'field',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['fields'],
			},
		},
		placeholder: 'id',
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
				operation: ['update'],
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
	{
		displayName: 'Update Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['fields'],
			},
			hide: {
				jsonParameters: [true],
			},
		},
		options: [
			{
				displayName: 'Meta (JSON)',
				name: 'meta',
				type: 'json',
				placeholder: '',
				default: null,
				description: 'The meta info',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
			},
			{
				displayName: 'Schema (JSON)',
				name: 'schema',
				type: 'json',
				placeholder: '',
				default: null,
				description: 'The schema info',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				placeholder: 'integer',
				default: 'bigInteger',
				description: 'Directus specific data type. Used to cast values in the API.',
				options: [
					{
						name: 'Big Integer',
						value: 'bigInteger',
						description: 'A larger number without a decimal point',
					},
					{
						name: 'Boolean',
						value: 'boolean',
						description: 'A True or False value',
					},
					{
						name: 'CSV',
						value: 'csv',
						description: 'A comma-separated value, returned as an array of strings',
					},
					{
						name: 'DateTime',
						value: 'dateTime',
						description: "A date and time saved in the database vendor's format",
					},
					{
						name: 'Date',
						value: 'date',
						description: "A date saved in the database vendor's format",
					},
					{
						name: 'Decimal',
						value: 'decimal',
						description: 'A higher precision, exact decimal number often used in finances',
					},
					{
						name: 'Field Group',
						value: 'alias',
					},
					{
						name: 'Float',
						value: 'float',
						description: 'A less exact number with a floating decimal point',
					},
					{
						name: 'Hash',
						value: 'string',
						description: 'A string hashed using argon2 cryptographic hash algorithm',
					},
					{
						name: 'Integer',
						value: 'integer',
						description: 'A number without a decimal point',
					},
					{
						name: 'JSON',
						value: 'json',
						description: 'A value nested in JavaScript Object Notation',
					},
					{
						name: 'M2A',
						value: 'm2a',
						description: 'Many to Any relationship',
					},
					{
						name: 'M2M',
						value: 'm2m',
						description: 'Many to Many relationship',
					},
					{
						name: 'M2O',
						value: 'm2o',
						description: 'Many to One relationship',
					},
					{
						name: 'Multiple Files',
						value: 'files',
						description: 'Field for Multiple Files',
					},
					{
						name: 'O2M',
						value: 'o2m',
						description: 'One to Many relationship',
					},
					{
						name: 'Presentation',
						value: 'alias',
					},
					{
						name: 'Single File',
						value: 'uuid',
						description: 'Field for a Single File',
					},
					{
						name: 'String',
						value: 'string',
						description: 'A shorter set of characters with a configurable max length',
					},
					{
						name: 'Text',
						value: 'text',
						description: 'A longer set of characters with no real-world max length',
					},
					{
						name: 'Timestamp',
						value: 'timestamp',
						description: 'A date, time, and timezone saved in ISO 8601 format',
					},
					{
						name: 'Time',
						value: 'time',
						description: "A time saved in the database vendor's format",
					},
					{
						name: 'UUID',
						value: 'uuid',
						description: 'A universally unique identifier saved in UUIDv4 format',
					},
				],
			},
		],
	},
];
