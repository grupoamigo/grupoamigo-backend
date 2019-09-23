import { ILoad } from 'app/shared/model/load.model';

export interface IDriver {
  id?: number;
  officialIdContentType?: string;
  officialId?: any;
  firstName?: string;
  lastName?: string;
  pictureContentType?: string;
  picture?: any;
  loads?: ILoad[];
}

export const defaultValue: Readonly<IDriver> = {};
