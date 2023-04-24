import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';

export async function create(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const parametersAreJson = this.getNodeParameter('jsonParameters', index) ?? false;
	const collection = !parametersAreJson
		? (this.getNodeParameter('collection', index) as string)
		: null;

	const additionalFields = !parametersAreJson
		? this.getNodeParameter('additionalFields', index)
		: {};
	const data = parametersAreJson
		? (this.getNodeParameter('bodyParametersJson', index) as object)
		: {};

	const requestMethod = 'POST';
	const endpoint = 'collections';

	let body = {} as any;
	if (parametersAreJson) {
		if (typeof data === 'string') {
			body = JSON.parse(data);
		} else {
			body = JSON.parse(JSON.stringify(data));
		}
	} else {
		for (const key in data) {
			if (['fields'].includes(key)) {
				const object = additionalFields[key] as object | string;
				if (typeof object === 'string') {
					body[key] = JSON.stringify(JSON.parse(object));
				} else {
					body[key] = JSON.stringify(object);
				}
			} else {
				body[key] = additionalFields[key];
			}
		}
		body.collection = collection;
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
