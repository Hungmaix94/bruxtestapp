import { IQuestionnaire } from 'app/shared/model/surveyModule/questionnaire.model';

export interface IQuestionnaireClient {
  id?: number;
  questionnaire?: IQuestionnaire;
}

export const defaultValue: Readonly<IQuestionnaireClient> = {};
