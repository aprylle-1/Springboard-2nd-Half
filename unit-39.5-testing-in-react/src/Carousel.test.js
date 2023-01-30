import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Carousel from "./Carousel";

it("renders onload", function () {
  render(<Carousel/>)
})

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move barckward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("does not have a left arrow button onload", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");

  expect(leftArrow).toBe(null);

});

it("does not have a left arrow button when moving towards the first image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  let rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  let leftArrow =  queryByTestId("left-arrow");
  expect(leftArrow).not.toBe(null);
  fireEvent.click(leftArrow);

  leftArrow =  queryByTestId("left-arrow");
  expect(leftArrow).toBe(null);
});

it("does not have a right arrow button when moving towards the last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  let rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).not.toBe(null);
  fireEvent.click(rightArrow);

  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).not.toBe(null);
  fireEvent.click(rightArrow);

  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBe(null);

});
