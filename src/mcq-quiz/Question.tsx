import React from 'react';

import { IQuestion } from './types';

interface QuestionProps {
  question: IQuestion;
  questionKey: string;
  submitHandler: (questionKey: number, result: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  questionKey,
  submitHandler,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = question.correct === +event.target.value;
    submitHandler(+questionKey, result);
  };

  return (
    <section className="question-container">
      <h4>{question.question}</h4>
      {question.answers.map((ans, index) => {
        return (
          <div className="choice" key={ans}>
            <input
              type="radio"
              name={questionKey}
              id={ans}
              value={index}
              onChange={onChangeHandler}
            />
            <label htmlFor={ans}>{ans}</label>
          </div>
        );
      })}
    </section>
  );
};

export default Question;
