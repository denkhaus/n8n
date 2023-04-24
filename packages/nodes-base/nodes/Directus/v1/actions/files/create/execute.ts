import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	IBinaryKeyData,
	IBinaryData,
} from 'n8n-workflow';
import { directusApiRequest, directusApiFileRequest } from '../../../transport';
import { helpers } from '../../../methods';

export async function create(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const sendBinaryData = this.getNodeParameter('sendBinaryData', index) as boolean;
	const additionalFields =
		(this.getNodeParameter('additionalFields', index) as IDataObject) ?? null;

	const data: IDataObject = (additionalFields.data as IDataObject) ?? {};
	const body: IDataObject = data ? helpers.parseData(data) : {};

	const requestMethod = 'POST';
	const endpoint = `files`;

	let response: any;
	if (sendBinaryData) {
		const items = this.getInputData();
		const item = items[index].binary as IBinaryKeyData;

		const binaryPropertyName =
			(this.getNodeParameter('binaryPropertyName', index) as string) ?? null;
		const binaryData = item[binaryPropertyName] as IBinaryData;
		const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);

		const formData = {};
		Object.assign(formData, {
			file: {
				value: binaryDataBuffer,
				options: {
					filename: binaryData.fileName,
					contentType: binaryData.mimeType,
				},
			},
		});

		response = await directusApiFileRequest.call(this, requestMethod, endpoint, formData, body);
	} else {
		const body = helpers.parseData(data);
		response = await directusApiRequest.call(this, requestMethod, endpoint, body);
	}

	return this.helpers.returnJsonArray(response);
}
