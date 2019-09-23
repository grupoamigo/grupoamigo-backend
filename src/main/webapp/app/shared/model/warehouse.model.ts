import { ICompany } from 'app/shared/model/company.model';
import { ILoad } from 'app/shared/model/load.model';
import { DivisionType } from 'app/shared/model/enumerations/division-type.model';

export interface IWarehouse {
  id?: number;
  name?: string;
  division?: DivisionType;
  owner?: ICompany;
  load?: ILoad;
}

export const defaultValue: Readonly<IWarehouse> = {};
