export interface IQuestion {
  question: string;
  answers: string[];
  correct: number;
}

export interface IQuestionBank {
  list: IQuestion[];
}
