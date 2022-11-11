import React from 'react';

import Quiz from './mcq-quiz/QuestionList';
import { questions } from './mcq-quiz/data';
import './App.css';

function App() {
  return (
    <div className="App">
      <Quiz list={questions} />
    </div>
  );
}

export default App;
