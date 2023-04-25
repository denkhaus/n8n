import { globalDescr } from '../../../descriptions';
import type { PermissionsProperties } from '../../interfaces';

export const createDescription: PermissionsProperties = [
	{
		displayName: 'Collection',
		name: 'collection',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['permissions'],
			},
			hide: {
				jsonParameters: [true],
			},
		},
		placeholder: 'customers',
		default: '',
		description: 'What collection this permission applies to',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCollections',
		},
	},
	{
		displayName: 'Action',
		name: 'action',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['permissions'],
			},
			hide: {
				jsonParameters: [true],
			},
		},
		placeholder: 'create',
		default: 'create',
		description:
			'What CRUD operation this permission rule applies to. One of `create`, `read`, `update`, `delete`.',
		required: true,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a permission',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a permission',
			},
			{
				name: 'Read',
				value: 'read',
				action: 'Read a permission',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a permission',
			},
		],
	},
	...globalDescr.jsonParameters('permissions', 'create'),
	...globalDescr.bodyParametersJson('permissions', 'create'),
];
