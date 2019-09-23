import { IContract } from 'app/shared/model/contract.model';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { IManouver } from 'app/shared/model/manouver.model';
import { CompanyType } from 'app/shared/model/enumerations/company-type.model';

export interface ICompany {
  id?: number;
  legalName?: string;
  taxId?: string;
  type?: CompanyType;
  logoContentType?: string;
  logo?: any;
  contracts?: IContract[];
  warehouse?: IWarehouse;
  manouver?: IManouver;
}

export const defaultValue: Readonly<ICompany> = {};
