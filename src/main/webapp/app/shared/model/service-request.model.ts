import { Moment } from 'moment';
import { StatusType } from 'app/shared/model/enumerations/status-type.model';

export interface IServiceRequest {
  id?: number;
  title?: string;
  description?: string;
  dateRequested?: Moment;
  dateBegin?: Moment;
  dateEnd?: Moment;
  status?: StatusType;
}

export const defaultValue: Readonly<IServiceRequest> = {};
