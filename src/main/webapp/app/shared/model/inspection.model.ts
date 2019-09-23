import { Moment } from 'moment';

export interface IInspection {
  id?: number;
  date?: Moment;
  signatureContentType?: string;
  signature?: any;
}

export const defaultValue: Readonly<IInspection> = {};
