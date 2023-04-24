import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function create(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const qs: IDataObject = {};
	const parametersAreJson = (this.getNodeParameter('jsonParameters', index) as boolean) ?? false;
	const additionalFields = !parametersAreJson
		? (this.getNodeParameter('additionalFields', index) as IDataObject)
		: {};

	const requestMethod = 'POST';
	const endpoint = `activity/comment`;

	let body: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('bodyParametersJson', index) as IDataObject | string;
		body = helpers.parseData(data);
	} else {
		const collection = this.getNodeParameter('collection', index) as string;
		const comment = this.getNodeParameter('comment', index) as string;
		const item = this.getNodeParameter('item', index) as number;
		for (const key in Object.keys(additionalFields)) {
			qs[key] = additionalFields[key];
		}

		body['comment'] = comment;
		body['collection'] = collection;
		body['item'] = item;
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(response);
}
