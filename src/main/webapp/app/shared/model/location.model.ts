import { Moment } from 'moment';

export interface ILocation {
  id?: number;
  address?: string;
  lat?: string;
  lng?: string;
  timestamp?: Moment;
}

export const defaultValue: Readonly<ILocation> = {};
