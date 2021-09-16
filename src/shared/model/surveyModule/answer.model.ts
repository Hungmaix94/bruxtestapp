import { IQuestionnaireClient } from 'app/shared/model/surveyModule/questionnaire-client.model';

export interface IAnswer {
  id?: number;
  answerValue?: string | null;
  questionId?: number;
  questionnaireClient?: IQuestionnaireClient;
}

export const defaultValue: Readonly<IAnswer> = {};
