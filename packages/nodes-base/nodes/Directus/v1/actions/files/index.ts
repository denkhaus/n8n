import { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as del from './delete';
import * as deleteMultiple from './deleteMultiple';
import * as get from './get';
import * as imp from './import';
import * as list from './list';
import * as update from './update';
import * as updateMultiple from './updateMultiple';

export { create, del as delete, deleteMultiple, get, imp as import, list, update, updateMultiple };

// https://docs.directus.io/reference/system/files.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['files'],
			},
		},
		options: [
			{
				name: 'Create / Upload',
				value: 'create',
				description: 'Create/Upload a new file',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing file',
			},
			{
				name: 'Delete Multiple',
				value: 'deleteMultiple',
				description: 'Delete multiple files',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single file by unique identifier',
			},
			{
				name: 'Import File',
				value: 'import',
				description: 'Import a file',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the files',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing file',
			},
			{
				name: 'Update Multiple',
				value: 'updateMultiple',
				description: 'Update Multiple Files',
			},
		],
		default: 'list',
	},

	...create.description,
	...del.description,
	...deleteMultiple.description,
	...get.description,
	...imp.description,
	...list.description,
	...update.description,
	...updateMultiple.description,
];
