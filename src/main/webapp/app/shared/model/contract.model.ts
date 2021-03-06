import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';
import { ContractType } from 'app/shared/model/enumerations/contract-type.model';
import { ContractStatusType } from 'app/shared/model/enumerations/contract-status-type.model';

export interface IContract {
  id?: number;
  type?: ContractType;
  title?: string;
  legalProse?: string;
  signatureContentType?: string;
  signature?: any;
  contractFileContentType?: string;
  contractFile?: any;
  qrCodeContentType?: string;
  qrCode?: any;
  digitalFingerprint?: string;
  dateSigned?: Moment;
  expirationDate?: Moment;
  status?: ContractStatusType;
  companies?: ICompany;
}

export const defaultValue: Readonly<IContract> = {};
