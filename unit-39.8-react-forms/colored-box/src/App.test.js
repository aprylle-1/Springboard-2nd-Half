import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test("matches snapshot", () => {
  const {asFragment} = render(<App/>)
  expect(asFragment).toMatchSnapshot()
})

test("add a new box", () => {
  const {container, getByLabelText, queryByText} = render(<App/>)
  
  const backgroundColorInput = getByLabelText("Background Color")
  const widthInput = getByLabelText("Box Width")
  const heightInput = getByLabelText("Box Height")
  const addBtn = queryByText("Create Box")

  fireEvent.change(backgroundColorInput, { target: { value: "purple" }});
  fireEvent.change(widthInput, { target: { value: 100 }});
  fireEvent.change(heightInput, { target: { value: 100 }});
  fireEvent.click(addBtn);

  const boxes = container.getElementsByClassName("Box")
  expect(boxes.length).toBe(3)
})