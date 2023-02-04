import { render, screen } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

test('renders without crashing', () => {
  render(<NewTodoForm />);
});

test('matches screenshot', () => {
    const { asFragment } = render(<NewTodoForm/>)
    expect(asFragment).toMatchSnapshot()
  })
  
