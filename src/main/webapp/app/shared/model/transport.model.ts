import { TransportType } from 'app/shared/model/enumerations/transport-type.model';

export interface ITransport {
  id?: number;
  plateId?: string;
  type?: TransportType;
}

export const defaultValue: Readonly<ITransport> = {};
