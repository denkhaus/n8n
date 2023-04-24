import * as clearCache from './clearCache';
import * as generateHash from './generateHash';
import * as getRandomString from './getRandomString';
import * as importFileData from './importFileData';
import * as sortItems from './sortItems';
import * as verifyHash from './verifyHash';

import type { INodeProperties } from 'n8n-workflow';
export { clearCache, generateHash, getRandomString, importFileData, sortItems, verifyHash };

// https://docs.directus.io/reference/utils.html
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['utils'],
			},
		},
		options: [
			{
				name: 'Clear Cache',
				value: 'clearCache',
				description: 'Clear the Internal Cache',
			},
			{
				name: 'Generate Hash',
				value: 'generateHash',
				description: 'Generate a Hash',
			},
			{
				name: 'Get a Random String',
				value: 'getRandomString',
				description: 'Returns a random string of given length',
			},
			{
				name: 'Import File Data',
				value: 'importFileData',
				description: 'Import Data from File',
			},
			{
				name: 'Sort Items',
				value: 'sortItems',
				description: 'Re-sort items in collection based on start and to value of item',
			},
			{
				name: 'Verifiy Hash',
				value: 'verifyHash',
				description: 'Verify a Hash',
			},
		],
		default: 'clearCache',
	},

	...clearCache.description,
	...generateHash.description,
	...getRandomString.description,
	...importFileData.description,
	...sortItems.description,
	...verifyHash.description,
];
