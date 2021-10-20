import React from "react";
import { render } from "@testing-library/react";
import Cart from "../Transactions/Cart";

it("renders without crashing", function() {
  render(<Cart />);
});

it("matches snapshot with no jobs", function() {
  const { asFragment } = render(<Cart />);
  expect(asFragment()).toMatchSnapshot();
});
