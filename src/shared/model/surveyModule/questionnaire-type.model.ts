export interface IQuestionnaireType {
  isScored?: boolean | null;
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
}

export const defaultValue: Readonly<IQuestionnaireType> = {
  isActive: false,
};
