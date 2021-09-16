import { IQuestion } from 'app/shared/model/surveyModule/question.model';

export interface IOfferedAnswer {
  isCorrect?: boolean | null;
  id?: number | string;
  languageCode?: string | null;
  answerText?: string | null;
  value?: number;
  isOtherAnswer?: boolean | null;
  question?: IQuestion;
}

export const defaultValue: Readonly<IOfferedAnswer> = {
  isOtherAnswer: false,
  isCorrect: false,
};

export interface IInitAnswer {
  id?: number | string;
  answerText?: string | null;
  value?: number | any;
  isCorrect?: boolean | null;
}
