export interface Question {
  id: string | number;
  question: string;
  answers: Answer[];
  isCurrentUserBuyer: boolean;
}

export interface Answer {
  id: string | number;
  answer: string;
  name: string;
  like: number | string;
  dislike: string | number;
}

export interface UserQuestions {
  questions: UserQuestionsItem[];
  meta: {
    current_page: number;
    last_page: number;
  };
}

export interface UserAnswers {
  answers: UserQuestionsItem[];
  meta: {
    current_page: number;
    last_page: number;
  };
}

export interface UserQuestionsItem {
  questionId: number;
  question: string;
  status: 'تائید شده' | 'رد شده' | 'در حال بررسی';
  itemType: 'product' | 'course';
  itemData: UserQuestionsItemItemDataItem[];
  answers: UserQuestionsItemAnswerItem[];
}

export interface UserQuestionsItemItemDataItem {
  id: number;
  title: string;
  mainImage: string;
}

export interface UserQuestionsItemAnswerItem {
  id: number;
  question_id: number;
  user_id: number;
  user_name: string;
  answerText: string;
  like: number;
  dislike: number;
  status: 'تائید شده' | 'رد شده' | 'در حال بررسی';
  created_at: string;
  updated_at: string;
}
