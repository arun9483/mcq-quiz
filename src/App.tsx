import React from 'react';

import Quiz from './mcq-quiz/QuestionList';
import { questions } from './mcq-quiz/data';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Quiz</h1>
      <hr />
      <Quiz list={questions} />
    </div>
  );
}

export default App;
