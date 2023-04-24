import * as create from './create';
import * as del from './delete';
import * as get from './get';
import * as list from './list';
import * as update from './update';

import type { INodeProperties } from 'n8n-workflow';
export { create, del as delete, update, get, list };

// https://docs.directus.io/reference/system/activity.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['activity'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Creates a new comment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an existing comment. Deleted comments can not be retrieved.',
			},
			{
				name: 'Get',
				value: 'get',
				description:
					'Retrieves the details of an existing activity action. Provide the primary key of the activity action and Directus will return the corresponding information.',
			},
			{
				name: 'List',
				value: 'list',
				description: 'Returns a list of activity actions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update the content of an existing comment',
			},
		],
		default: 'list',
	},

	...create.description,
	...del.description,
	...get.description,
	...list.description,
	...update.description,
];
