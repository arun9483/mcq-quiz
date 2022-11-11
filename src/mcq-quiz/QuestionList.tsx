import React, { useState, useEffect } from 'react';

import Question from './Question';
import { IQuestionBank } from './types';

const Quiz: React.FC<IQuestionBank> = ({ list }) => {
  const [attemptedStatus, setAttemptedStatus] = useState<boolean[]>(
    Array(list.length).fill(false)
  );
  const [submittedAnswers, setSubmittedAnswers] = useState<boolean[]>(
    Array(list.length).fill(false)
  );
  const [attemptedCounter, setAttemptedCounter] = useState<number>(0);

  useEffect(() => {
    const count = attemptedStatus.reduce(
      (prev, status) => (status ? prev + 1 : prev),
      0
    );
    setAttemptedCounter(count);
  }, [attemptedStatus]);

  const submitHandler = (questionKey: number, result: boolean) => {
    let attempted = [...attemptedStatus];
    attempted[questionKey] = true;
    setAttemptedStatus(attempted);

    let answers = [...submittedAnswers];
    answers[questionKey] = result;
    setSubmittedAnswers(answers);
  };

  const totalCorrectAnswers = submittedAnswers.reduce(
    (prev: number, answer) => (answer ? prev + 1 : prev),
    0
  );

  return (
    <section className="quiz-container">
      {attemptedCounter < list.length && (
        <Question
          question={list[attemptedCounter]}
          questionKey={`${attemptedCounter}`}
          submitHandler={submitHandler}
        />
      )}
      {attemptedCounter === list.length && (
        <div className="result-screen">
          <h4>Result</h4>
          <div>You scored {(100 * totalCorrectAnswers) / list.length}%</div>
        </div>
      )}
    </section>
  );
};

export default Quiz;
