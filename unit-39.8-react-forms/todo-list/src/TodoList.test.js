import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

test('renders without crashing', () => {
  render(<TodoList />);
});

test('matches screenshot', () => {
  const { asFragment } = render(<TodoList/>)
  expect(asFragment).toMatchSnapshot()
})
