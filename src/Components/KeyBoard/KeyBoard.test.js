import React from "react";
import { render, mount } from "../../setupTest";
import KeyBoard from "./KeyBoard";
import { mockRolls } from "../mock";

describe("KeyBoard component", () => {
  let updateScore = jest.fn(() => {});
  let wrapper;
  beforeEach(() => {
    wrapper = render(<KeyBoard updateScore={updateScore} rolls={mockRolls} />);
  });
  test("snapshot test", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("updatesScore onClick", () => {
    const wrapper = mount(
      <KeyBoard updateScore={updateScore} rolls={mockRolls} />
    );
    wrapper
      .find("button")
      .at(0)
      .simulate("click");
    expect(wrapper.prop("updateScore")).toHaveBeenCalled();
  });
});
