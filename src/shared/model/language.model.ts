export interface ILanguage {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<ILanguage> = {
  isActive: false,
};
