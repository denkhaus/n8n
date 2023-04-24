import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiRequest } from '../../../transport';

export async function imp(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const URL = this.getNodeParameter('url', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index) ?? null;
	const data = (additionalFields?.data as object | string) ?? null;

	const requestMethod = 'POST';
	const endpoint = 'files/import';
	const body: IDataObject = {};

	if (typeof data === 'string') {
		body.data = JSON.parse(data);
		body.url = URL;
	} else if (data && typeof data !== 'string') {
		body.data = JSON.parse(JSON.stringify(data));
		body.url = URL;
	} else {
		body.url = URL;
	}

	const response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	return this.helpers.returnJsonArray(response);
}
