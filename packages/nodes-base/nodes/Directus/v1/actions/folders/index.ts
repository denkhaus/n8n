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

// https://docs.directus.io/reference/folders.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['folders'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new folder',
			},
			{
				name: 'Create Multiple',
				value: 'createMultiple',
				description: 'Create Multiple Folders',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing folder',
			},
			{
				name: 'Delete Multiple',
				value: 'deleteMultiple',
				description: 'Delete Multiple Folders',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single folder by unique identifier',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the folders',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing folder',
			},
			{
				name: 'Update Multiple',
				value: 'updateMultiple',
				description: 'Update Multiple Folders',
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
