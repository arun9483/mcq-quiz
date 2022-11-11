import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Question from '../Question';
import { questions } from './../data';

describe('Test Question component', () => {
  test('render multiple choice question', () => {
    const mockFn = jest.fn((questionKey: number, result: boolean) => {});
    render(
      <Question
        question={questions[0]}
        questionKey={`0`}
        submitHandler={mockFn}
      />
    );
    const question = screen.getByRole('heading', { level: 4 });
    expect(question).toBeInTheDocument();
    expect(question).toHaveAccessibleName(questions[0].question);
  });

  test('render all answer choices', () => {
    const mockFn = jest.fn((questionKey: number, result: boolean) => {});
    render(
      <Question
        question={questions[0]}
        questionKey={`0`}
        submitHandler={mockFn}
      />
    );
    const options = screen.getAllByRole('radio');
    expect(options).toHaveLength(4);
  });

  test('wrong answer selection', () => {
    const mockFn = jest.fn((questionKey: number, result: boolean) => {});
    render(
      <Question
        question={questions[0]}
        questionKey={`0`}
        submitHandler={mockFn}
      />
    );
    const secondOption = screen.getByLabelText(/4/);
    userEvent.click(secondOption);
    expect(mockFn).toHaveBeenCalledWith(0, false);
  });

  test('right answer selection', () => {
    const mockFn = jest.fn((questionKey: number, result: boolean) => {});
    render(
      <Question
        question={questions[0]}
        questionKey={`0`}
        submitHandler={mockFn}
      />
    );
    const forthOption = screen.getByLabelText(/16/);
    userEvent.click(forthOption);
    expect(mockFn).toHaveBeenCalledWith(0, true);
  });
});
