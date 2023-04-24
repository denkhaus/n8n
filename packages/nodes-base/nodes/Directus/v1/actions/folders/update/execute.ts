import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function update(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const ID = this.getNodeParameter('id', index) as string;
	const parametersAreJson = (this.getNodeParameter('jsonParameters', index) as boolean) ?? false;
	const additionalFields = !parametersAreJson
		? (this.getNodeParameter('additionalFields', index) as IDataObject)
		: {};

	const requestMethod = 'PATCH';
	const endpoint = `folders/${ID}`;

	let body: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('bodyParametersJson', index) as IDataObject | string;
		body = helpers.parseData(data);
	} else {
		helpers.applyVarsTo(body, additionalFields);
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
