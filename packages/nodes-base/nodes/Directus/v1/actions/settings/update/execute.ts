import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function update(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const parametersAreJson = this.getNodeParameter('jsonParameters', index);
	const additionalFields = !parametersAreJson
		? this.getNodeParameter('additionalFields', index)
		: {};
	const data = (this.getNodeParameter('data', index) as IDataObject | string) ?? {};

	const requestMethod = 'PATCH';
	const endpoint = 'settings';

	let qs: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('queryParametersJson', index) as IDataObject | string;
		qs = helpers.parseData(data);
	} else {
		helpers.applyVarsTo(qs, additionalFields);
	}

	const body = helpers.parseData(data);
	const response = await directusApiRequest.call(this, requestMethod, endpoint, body, qs);
	return this.helpers.returnJsonArray(response);
}
