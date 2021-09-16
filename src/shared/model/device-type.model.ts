export interface IDeviceType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IDeviceType> = {
  isActive: false,
};
