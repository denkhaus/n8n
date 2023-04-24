import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function create(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const parametersAreJson = this.getNodeParameter('jsonParameters', index) as boolean;

	let body: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('bodyParametersJson', index) as IDataObject | string;
		body = helpers.parseData(data);
	} else {
		const name = this.getNodeParameter('name', index) as string;
		const url = this.getNodeParameter('url', index) as string;
		const actions = this.getNodeParameter('actions', index) as IDataObject | string;
		const collections = this.getNodeParameter('collections', index) as IDataObject | string;

		if (typeof actions === 'string') {
			body['actions'] = JSON.parse(actions);
		} else {
			body['actions'] = JSON.parse(JSON.stringify(actions));
		}
		if (typeof collections === 'string') {
			body['collections'] = JSON.parse(collections);
		} else {
			body['collections'] = JSON.parse(JSON.stringify(collections));
		}
		body['name'] = name;
		body['url'] = url;
	}

	const requestMethod = 'POST';
	const endpoint = `webhooks`;

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
