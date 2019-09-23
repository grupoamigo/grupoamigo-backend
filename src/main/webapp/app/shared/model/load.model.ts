import { IWarehouse } from 'app/shared/model/warehouse.model';
import { IDriver } from 'app/shared/model/driver.model';
import { LoadType } from 'app/shared/model/enumerations/load-type.model';
import { LoadStatusType } from 'app/shared/model/enumerations/load-status-type.model';

export interface ILoad {
  id?: number;
  type?: LoadType;
  uniqueId?: string;
  description?: string;
  status?: LoadStatusType;
  warehouse?: IWarehouse;
  drivers?: IDriver[];
  warehouses?: IWarehouse;
}

export const defaultValue: Readonly<ILoad> = {};
