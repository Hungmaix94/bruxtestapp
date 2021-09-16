export interface IAnswerType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IAnswerType> = {
  isActive: false,
};
