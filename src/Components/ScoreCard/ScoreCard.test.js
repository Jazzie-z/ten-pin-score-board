import React from "react";
import { render } from "../../setupTest";
import ScoreCard from "./ScoreCard";
import { mockRolls } from "../mock";

describe("ScoreCard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<ScoreCard score={mockRolls[0]} />);
  });
  test("snapshot test", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders with value", () => {
    expect(wrapper.find(".first__roll").text()).toBe(mockRolls[0].primary);
  });

  it("renders without value", () => {
    wrapper = render(<ScoreCard score={{}} total={0} />);
    expect(wrapper.find(".first__roll").text()).toBe("");
  });
});
