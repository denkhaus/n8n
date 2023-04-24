import { globalDescr } from '../../../descriptions';
import { AuthProperties } from '../../interfaces';

export const listDescription: AuthProperties = [...globalDescr.splitIntoItems('auth', 'list')];
