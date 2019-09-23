import { Moment } from 'moment';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { StatusType } from 'app/shared/model/enumerations/status-type.model';

export interface IServiceRequest {
  id?: number;
  title?: string;
  description?: string;
  dateRequested?: Moment;
  dateBegin?: Moment;
  dateEnd?: Moment;
  status?: StatusType;
  serviceQuote?: IServiceQuote;
}

export const defaultValue: Readonly<IServiceRequest> = {};
