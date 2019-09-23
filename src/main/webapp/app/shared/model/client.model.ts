import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';
import { ClientStatusType } from 'app/shared/model/enumerations/client-status-type.model';

export interface IClient {
  id?: number;
  uniqueId?: string;
  memberSince?: Moment;
  status?: ClientStatusType;
  internalNotes?: string;
  suppliers?: ICompany;
  clients?: ICompany;
}

export const defaultValue: Readonly<IClient> = {};
