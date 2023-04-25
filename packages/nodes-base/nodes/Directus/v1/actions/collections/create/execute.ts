import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

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
		? (this.getNodeParameter('bodyParametersJson', index) as IDataObject)
		: {};

	const requestMethod = 'POST';
	const endpoint = 'collections';

	let body = {} as any;
	if (parametersAreJson) {
		body = helpers.parseData(data);
	} else {
		for (const key in data) {
			if (['fields'].includes(key)) {
				const object = additionalFields[key] as IDataObject | string;
				body[key] = helpers.parseData(object);
			} else {
				body[key] = additionalFields[key];
			}
		}
		body.collection = collection;
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
