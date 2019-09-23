import { Moment } from 'moment';
import { ClientStatusType } from 'app/shared/model/enumerations/client-status-type.model';

export interface IClient {
  id?: number;
  uniqueId?: string;
  memberSince?: Moment;
  status?: ClientStatusType;
  internalNotes?: string;
}

export const defaultValue: Readonly<IClient> = {};
