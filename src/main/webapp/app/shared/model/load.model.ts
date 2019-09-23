import { IWarehouse } from 'app/shared/model/warehouse.model';
import { IDriver } from 'app/shared/model/driver.model';
import { LoadType } from 'app/shared/model/enumerations/load-type.model';

export interface ILoad {
  id?: number;
  type?: LoadType;
  uniqueId?: string;
  description?: string;
  warehouse?: IWarehouse;
  drivers?: IDriver[];
}

export const defaultValue: Readonly<ILoad> = {};
