import { IQuestionSection } from 'app/shared/model/surveyModule/question-section.model';
import { IAnswerType } from 'app/shared/model/surveyModule/answer-type.model';
import { IQuestionnaire } from 'app/shared/model/surveyModule/questionnaire.model';
import { IOfferedAnswer } from 'app/shared/model/surveyModule/offered-answer.model';

export interface IQuestion {
  subQuestions?: IQuestion[];
  offeredAnswers?: IOfferedAnswer[];
  id?: number;
  languageCode?: string | null;
  questionNumber?: number;
  questionText?: string;
  conditionQuestionText?: string | null;
  description?: string | null;
  isObligatory?: boolean | null;
  questionSection?: IQuestionSection | null;
  answerType?: IAnswerType | null;
  questionnaire?: IQuestionnaire;
}

export const defaultValue: Readonly<IQuestion> = {
  isObligatory: false,
};

export const initQuestion = {
  questionText: '',
};
