export interface IDiseaseType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IDiseaseType> = {
  isActive: false,
};
