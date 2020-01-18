import React from "react";
import { render, mount } from "../../setupTest";
import KeyBoard from "./KeyBoard";
import { mockRolls } from "../mock";

describe("KeyBoard component", () => {
  let updateRolls = jest.fn(() => {});
  let wrapper;
  beforeEach(() => {
    wrapper = render(<KeyBoard updateRolls={updateRolls} rolls={mockRolls} />);
  });
  test("snapshot test", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("updatesScore onClick", () => {
    const wrapper = mount(
      <KeyBoard updateRolls={updateRolls} rolls={mockRolls} />
    );
    wrapper
      .find("button")
      .at(0)
      .simulate("click");
    expect(wrapper.prop("updateRolls")).toHaveBeenCalled();
  });
});
