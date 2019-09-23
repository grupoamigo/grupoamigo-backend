import { IMembership } from 'app/shared/model/membership.model';
import { IContract } from 'app/shared/model/contract.model';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { IManouver } from 'app/shared/model/manouver.model';
import { IClient } from 'app/shared/model/client.model';
import { CompanyType } from 'app/shared/model/enumerations/company-type.model';

export interface ICompany {
  id?: number;
  legalName?: string;
  taxId?: string;
  type?: CompanyType;
  logoContentType?: string;
  logo?: any;
  memberships?: IMembership[];
  contracts?: IContract[];
  warehouse?: IWarehouse;
  manouver?: IManouver;
  suppliers?: IClient[];
  clients?: IClient[];
}

export const defaultValue: Readonly<ICompany> = {};
