import { DateTime } from 'luxon';
import moment from 'moment';
import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export function parseDate(this: IExecuteFunctions, date: string | DateTime, timezone: string) {
	let parsedDate;

	if (date instanceof DateTime) {
		parsedDate = date;
	} else {
		parsedDate = DateTime.fromISO(moment.tz(date, timezone).toISOString());
		if (parsedDate.invalidReason === 'unparsable') {
			throw new NodeOperationError(this.getNode(), 'Invalid date format');
		}
	}
	return parsedDate;
}