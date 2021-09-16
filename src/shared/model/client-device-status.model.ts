export interface IClientDeviceStatus {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IClientDeviceStatus> = {
  isActive: false,
};
