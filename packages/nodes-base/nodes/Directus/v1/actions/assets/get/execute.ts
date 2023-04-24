import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { directusApiAssetRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const parametersAreJson = this.getNodeParameter('jsonParameters', index) as boolean;
	const additionalFields = !parametersAreJson
		? (this.getNodeParameter('additionalFields', index) as IDataObject)
		: {};

	const ID = (this.getNodeParameter('id', index) as string) ?? null;
	const dataPropertyName = this.getNodeParameter('binaryPropertyName', index) as string;
	const includeFileData = this.getNodeParameter('includeFileData', index) as boolean;

	const requestMethod = 'GET';

	let qs: IDataObject = {};
	if (parametersAreJson) {
		const data = this.getNodeParameter('queryParametersJson', index) as IDataObject | string;
		qs = helpers.parseData(data);
	} else {
		for (const key of Object.keys(additionalFields)) {
			if (key !== 'id' && key !== 'transforms') {
				qs[key] = additionalFields[key];
			}
			if (key === 'transforms') {
				if (typeof additionalFields[key] === 'string') {
					qs[key] = JSON.parse(additionalFields[key] as string);
				} else {
					qs[key] = JSON.parse(JSON.stringify(additionalFields[key]));
				}
			}
		}
	}

	const response = await directusApiAssetRequest.call(
		this,
		requestMethod,
		ID,
		dataPropertyName,
		qs,
	);
	if (!includeFileData) delete response.json['file'];

	return this.helpers.returnJsonArray(response);
}
