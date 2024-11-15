// types

import { Question, UserAnswers, UserQuestions } from '../models/qAndA';

// ----------------------------------------------------------------------

export interface QAndAState {
  qAndA: Question[];

  userQuestions: UserQuestions;

  userAnswers: UserAnswers;
}

export const initialQAndAState: QAndAState = {
  qAndA: [],
  userQuestions: { questions: [], meta: { current_page: 1, last_page: 1 } },
  userAnswers: { answers: [], meta: { current_page: 1, last_page: 1 } },
};
