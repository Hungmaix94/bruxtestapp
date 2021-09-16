export interface IAuthorityType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IAuthorityType> = {
  isActive: false,
};
