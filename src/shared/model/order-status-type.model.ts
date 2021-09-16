export interface IOrderStatusType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IOrderStatusType> = {
  isActive: false,
};
