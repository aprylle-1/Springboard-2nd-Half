import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('matches screenshot', () => {
  const { asFragment } = render(<App/>)
  expect(asFragment).toMatchSnapshot()
})

test('adds new todo item', () =>{
  const {container, getByLabelText, queryByText} = render(<App/>)

  const taskInput = getByLabelText("Task")
  const addTodoBtn = queryByText("Add todo")

  fireEvent.change(taskInput, {target : {value : "add todo"}})
  fireEvent.click(addTodoBtn)

  const todos = container.getElementsByClassName("todo-item")
  expect(todos.length).toBe(1)
})