import { IAnswer } from 'app/shared/model/surveyModule/answer.model';
import { IOfferedAnswer } from 'app/shared/model/surveyModule/offered-answer.model';

export interface IAnswerOfferedAnswer {
  id?: number;
  answer?: IAnswer;
  offeredAnswer?: IOfferedAnswer;
}

export const defaultValue: Readonly<IAnswerOfferedAnswer> = {};
