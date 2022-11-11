import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuestionList from './../QuestionList';

describe('Test QuestionList component', () => {
  test('render question list with first question', () => {
    const questions = [
      {
        question: 'What is 2*(4+4)?',
        answers: ['2', '4', '8', '16'],
        correct: 3,
      },
    ];

    render(<QuestionList list={questions} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveAccessibleName(
      'What is 2*(4+4)?'
    );
  });
  test('on selecting one of answer, it should render next question', () => {
    const questions = [
      {
        question: 'What is 2*(4+4)?',
        answers: ['2', '4', '8', '16'],
        correct: 3,
      },
      {
        question: 'What is 9*9?',
        answers: ['18', '81', '80', '79'],
        correct: 1,
      },
    ];
    render(<QuestionList list={questions} />);

    //assert question1 is rendered
    expect(
      screen.getByRole('heading', { name: 'What is 2*(4+4)?' })
    ).toBeInTheDocument();

    const secondOption = screen.getByRole('radio', { name: '4' });
    userEvent.click(secondOption);

    //assert question1 is not rendered
    expect(
      screen.queryByRole('heading', { name: 'What is 2*(4+4)?' })
    ).not.toBeInTheDocument();

    //assert question2 is rendered
    expect(
      screen.getByRole('heading', { name: 'What is 9*9?' })
    ).toBeInTheDocument();
  });

  test('after last question display score', () => {
    const questions = [
      {
        question: 'What is 2*(4+4)?',
        answers: ['2', '4', '8', '16'],
        correct: 3,
      },
    ];
    render(<QuestionList list={questions} />);

    //assert question is rendered, and since this is only question so this is last question also
    expect(
      screen.getByRole('heading', { name: 'What is 2*(4+4)?' })
    ).toBeInTheDocument();

    const secondOption = screen.getByRole('radio', { name: '4' });
    userEvent.click(secondOption);

    //assert question is not rendered
    expect(
      screen.queryByRole('heading', { name: 'What is 2*(4+4)?' })
    ).not.toBeInTheDocument();

    //assert result is rendered
    expect(screen.getByRole('heading', { name: 'Result' })).toBeInTheDocument();
  });

  test('render correct result 0%', () => {
    const questions = [
      {
        question: 'What is 2*(4+4)?',
        answers: ['2', '4', '8', '16'],
        correct: 3,
      },
    ];
    render(<QuestionList list={questions} />);

    const secondOption = screen.getByRole('radio', { name: '4' });
    userEvent.click(secondOption);

    expect(screen.getByText('You scored 0%')).toBeInTheDocument();
  });

  test('render correct result 100%', () => {
    const questions = [
      {
        question: 'What is 2*(4+4)?',
        answers: ['2', '4', '8', '16'],
        correct: 3,
      },
    ];

    render(<QuestionList list={questions} />);

    const secondOption = screen.getByRole('radio', { name: '16' });
    userEvent.click(secondOption);

    //assert score is rendered
    expect(screen.getByText('You scored 100%')).toBeInTheDocument();
  });
});
