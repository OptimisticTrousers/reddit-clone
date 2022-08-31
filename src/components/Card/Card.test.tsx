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
});
