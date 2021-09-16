export interface ICurrency {
  isActive?: boolean;
  id?: number;
  currAbbreviation?: string;
  currName?: string;
  enumKey?: string;
}

export const updatableFields = ['id', 'currName', 'currAbbreviation'];

export const defaultValue: Readonly<ICurrency> = {};
