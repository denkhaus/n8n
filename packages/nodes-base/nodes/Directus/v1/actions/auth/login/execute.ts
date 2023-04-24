import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function login(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const parametersAreJson = this.getNodeParameter('jsonParameters', index) ?? false;
	const additionalFields = !parametersAreJson
		? this.getNodeParameter('additionalFields', index)
		: {};
	const email = !parametersAreJson ? (this.getNodeParameter('email', index) as string) : '';
	const password = !parametersAreJson ? (this.getNodeParameter('password', index) as string) : '';

	const requestMethod = 'POST';
	const endpoint = 'auth/login';

	let body: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('bodyParametersJson', index) as IDataObject | string;
		body = helpers.parseData(data);
	} else {
		body.email = email;
		body.password = password;

		for (const key in additionalFields) {
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
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
