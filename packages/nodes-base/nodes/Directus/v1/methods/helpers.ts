import type {
	IBinaryKeyData,
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
} from 'n8n-workflow';
import type { IAggregationDescription } from '../types';

export function hasAnyKeys(o: IDataObject | undefined): boolean {
	return !!o && !!Object.keys(o).length;
}

export function splitUpResponse(
	response: IDataObject | IDataObject[],
	binary?: IBinaryKeyData,
): IDataObject | IDataObject[] {
	return Array.isArray(response)
		? response.map((item) => (hasAnyKeys(binary) ? { json: item, binary } : { json: item }))
		: response;
}

export function buildExecutionData(
	this: IExecuteFunctions,
	response: IDataObject | IDataObject[],
	split: boolean,
	binary?: IBinaryKeyData,
): INodeExecutionData[] {
	if (split) {
		return this.helpers.returnJsonArray(splitUpResponse(response, binary));
	}

	if (hasAnyKeys(binary)) {
		return this.helpers.returnJsonArray({ json: response, binary });
	}

	return this.helpers.returnJsonArray(response);
}

export function buildEndpoint(
	this: IExecuteFunctions,
	index: number,
	endpointParams: string[],
): string {
	let endpoint = endpointParams[0];
	const params = endpointParams.slice(1).map((p) => this.getNodeParameter(p, index) as string);
	return (endpoint = `${endpoint}/${params.join('/')}`);
}

export function formatResponse(response: any): IDataObject | IDataObject[] {
	let data = typeof response !== 'object' ? { result: response } : response.data ?? {};
	data = typeof data !== 'object' ? { result: data } : data;
	return Array.isArray(data) && data.length === 0 ? {} : data;
}

export function parseData(data: string | IDataObject): IDataObject {
	try {
		return typeof data === 'string' ? JSON.parse(data) : JSON.parse(JSON.stringify(data));
	} catch (error) {
		throw new Error(error);
	}
}

export function applyVarsTo(target: IDataObject, vars: IDataObject) {
	for (const key in vars) {
		if (['deep', 'filter'].includes(key)) {
			const o = vars[key] as IDataObject | string;
			target[key] = parseData(o);
		} else if (['aggregate'].includes(key)) {
			const o = vars[key] as IDataObject;
			const ad = o.aggregationFunctions as IAggregationDescription[];
			ad.forEach((a) => {
				target[`aggregate[${a.name}]`] = a.value;
			});
		} else {
			target[key] = vars[key];
		}
	}
}

export async function responseToBinary(
	this: IExecuteFunctions | IExecuteSingleFunctions,
	response: IDataObject | IDataObject[],
	exportType: string,
	fileName: string = 'export',
	binaryPropertyName: string = 'data',
): Promise<IBinaryKeyData> {
	const binary: IBinaryKeyData = {};

	if (exportType) {
		let binaryData: Buffer, mimeType: string, fileExtension: string;

		const strContent = Array.isArray(response)
			? JSON.stringify(response)
			: (response.result as string) ?? JSON.stringify(response);

		console.log('strContent:', strContent);
		if (exportType === 'json') {
			binaryData = Buffer.from(strContent);
			mimeType = 'application/json';
			fileExtension = 'json';
			fileName = `${fileName}.${fileExtension}`;
		} else if (exportType === 'csv') {
			binaryData = Buffer.from(strContent);
			mimeType = 'text/csv';
			fileExtension = 'csv';
			fileName = `${fileName}.${fileExtension}`;
		} else if (exportType === 'xml') {
			binaryData = Buffer.from(strContent);
			mimeType = 'application/xml';
			fileExtension = 'xml';
			fileName = `${fileName}.${fileExtension}`;
		} else {
			binaryData = Buffer.alloc(0);
			mimeType = '';
		}

		binary[binaryPropertyName] = await this.helpers.prepareBinaryData(
			binaryData,
			fileName,
			mimeType,
		);
	}

	return binary;
}
