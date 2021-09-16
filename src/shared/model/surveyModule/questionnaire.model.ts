import { IQuestionnaireType } from 'app/shared/model/surveyModule/questionnaire-type.model';
import { IQuestion } from 'app/shared/model/surveyModule/question.model';

export interface IQuestionnaire {
  isScored?: any;
  id?: number;
  title?: string | null;
  description?: string | null;
  endDate?: string | null;
  questionnaireType?: IQuestionnaireType;
  questions?: IQuestion[];
  isActive?: boolean;
  questionnaireResults?: any[];
  // ToDo: change when BE done
  // questionnaireResults?: IQuestionnaireResult[];
}

export const defaultValue: Readonly<IQuestionnaire> = {};
