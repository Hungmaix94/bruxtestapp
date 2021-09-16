import { IQuestion } from 'app/shared/model/surveyModule/question.model';

export interface IQuestionSection {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
  questions?: IQuestion[];
}

export const defaultValue: Readonly<IQuestionSection> = {
  isActive: false,
};
