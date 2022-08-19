import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";

describe("Card", () => {
  test("snapshot", () => {
    const { asFragment } = render(
      <Card>
        <div>Mock Children</div>
      </Card>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders children", () => {
    render(
      <Card>
        <div>Mock Children</div>
      </Card>
    );

    const card = screen.getByText("Mock Children");

    expect(card.textContent).toBe("Mock Children");
  });
});
