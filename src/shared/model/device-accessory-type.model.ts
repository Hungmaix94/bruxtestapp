export interface IDeviceAccessoryType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IDeviceAccessoryType> = {
  isActive: false,
};
