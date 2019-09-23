export interface ISeal {
  id?: number;
  issuer?: string;
  uniqueId?: string;
}

export const defaultValue: Readonly<ISeal> = {};
