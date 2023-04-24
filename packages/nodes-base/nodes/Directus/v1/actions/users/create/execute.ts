import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function create(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const parametersAreJson = (this.getNodeParameter('jsonParameters', index) as boolean) ?? false;
	const additionalFields = !parametersAreJson
		? (this.getNodeParameter('additionalFields', index) as IDataObject)
		: {};

	const requestMethod = 'POST';
	const endpoint = `users`;

	let body: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('bodyParametersJson', index) as IDataObject | string;
		body = helpers.parseData(data);
	} else {
		helpers.applyVarsTo(body, additionalFields);
		body['email'] = this.getNodeParameter('email', index) as string;
		body['password'] = this.getNodeParameter('password', index) as string;
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
