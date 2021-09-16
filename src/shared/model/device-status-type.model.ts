export interface IDeviceStatusType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IDeviceStatusType> = {
  isActive: false,
};
