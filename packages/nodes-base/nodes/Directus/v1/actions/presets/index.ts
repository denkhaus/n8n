import * as create from './create';
import * as createMultiple from './createMultiple';
import * as del from './delete';
import * as deleteMultiple from './deleteMultiple';
import * as update from './update';
import * as updateMultiple from './updateMultiple';
import * as get from './get';
import * as list from './list';

import type { INodeProperties } from 'n8n-workflow';
export { create, createMultiple, del as delete, deleteMultiple, update, updateMultiple, get, list };

// https://docs.directus.io/reference/presets.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['presets'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new preset',
			},
			{
				name: 'Create Multiple',
				value: 'createMultiple',
				description: 'Create Multiple Presets',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing preset',
			},
			{
				name: 'Delete Multiple',
				value: 'deleteMultiple',
				description: 'Delete Multiple Presets',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single preset by unique identifier',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the presets',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing preset',
			},
			{
				name: 'Update Multiple',
				value: 'updateMultiple',
				description: 'Update Multiple Presets',
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
