import type { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as createMultiple from './createMultiple';
import * as del from './delete';
import * as deleteMultiple from './deleteMultiple';
import * as update from './update';
import * as updateMultiple from './updateMultiple';
import * as get from './get';
import * as list from './list';

export { create, createMultiple, del as delete, deleteMultiple, update, updateMultiple, get, list };

// https://docs.directus.io/reference/webhooks.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['roles'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new role',
			},
			{
				name: 'Create Multiple',
				value: 'createMultiple',
				description: 'Create Multiple Roles',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing role',
			},
			{
				name: 'Delete Multiple',
				value: 'deleteMultiple',
				description: 'Delete Multiple Roles',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single role by unique identifier',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the roles',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing role',
			},
			{
				name: 'Update Multiple',
				value: 'updateMultiple',
				description: 'Update Multiple Roles',
			},
		],
		default: 'list',
	},

	...create.description,
	...createMultiple.description,
	...del.description,
	...deleteMultiple.description,
	...get.description,
	...list.description,
	...update.description,
	...updateMultiple.description,
];
