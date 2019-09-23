import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { MembershipRole } from 'app/shared/model/enumerations/membership-role.model';
import { MembershipLevelType } from 'app/shared/model/enumerations/membership-level-type.model';

export interface IMembership {
  id?: number;
  role?: MembershipRole;
  created?: Moment;
  expires?: Moment;
  accountLevel?: MembershipLevelType;
  user?: IUser;
}

export const defaultValue: Readonly<IMembership> = {};
