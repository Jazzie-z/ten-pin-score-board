import React from "react";
import { render, mount } from "../../setupTest";
import ScoreBoard from "./ScoreBoard";
import { mockRolls, mockTotal } from "../mock";

describe("ScoreBoard component", () => {
  test("snapshot test", () => {
    const wrapper = render(<ScoreBoard rolls={mockRolls} total={mockTotal} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders with value", () => {
    const wrapper = mount(<ScoreBoard rolls={mockRolls} total={mockTotal} />);
    expect(wrapper.prop("rolls").length).toBe(mockRolls.length);
  });

  it("renders the excess value", () => {
    let mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4];
    const wrapper = render(<ScoreBoard rolls={mockRolls} total={mock} />);
    expect(wrapper.find(".card__total").text()).toBe(mock[9].toString());
  });
});
