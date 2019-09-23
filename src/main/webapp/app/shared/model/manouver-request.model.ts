import { Moment } from 'moment';
import { TransportType } from 'app/shared/model/enumerations/transport-type.model';

export interface IManouverRequest {
  id?: number;
  title?: string;
  description?: string;
  date?: Moment;
  transportType?: TransportType;
  qrCodeContentType?: string;
  qrCode?: any;
}

export const defaultValue: Readonly<IManouverRequest> = {};
