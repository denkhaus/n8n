import { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as del from './delete';
import * as get from './get';
import * as list from './list';
import * as listAll from './listAll';
import * as update from './update';

export { create, del as delete, get, list, listAll, update };

// https://docs.directus.io/reference/system/fields.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fields'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new field',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing field',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieves the details of a single field in a given collection',
			},
			{
				name: 'List',
				value: 'list',
				description: 'Returns a list of the fields available in the given collection',
			},
			{
				name: 'List All',
				value: 'listAll',
				description: 'Returns a list of the fields available in the project',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing field',
			},
		],
		default: 'list',
	},

	...create.description,
	...del.description,
	...get.description,
	...list.description,
	...listAll.description,
	...update.description,
];
