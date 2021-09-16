export interface IProviderTransaction {
  id?: number;
  name?: string;
  description?: string;
  enumKey?: string;
  isActive?: boolean;
  posId?: number;
}

export const defaultValue: Readonly<IProviderTransaction> = {
  isActive: true,
};
