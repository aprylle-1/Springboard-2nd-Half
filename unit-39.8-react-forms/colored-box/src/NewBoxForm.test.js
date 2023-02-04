import { render, screen } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

test('renders without crashing', () => {
  render(<NewBoxForm />);
});

test("matches snapshot", () => {
    const {asFragment} = render(<NewBoxForm/>)
    expect(asFragment).toMatchSnapshot()
})