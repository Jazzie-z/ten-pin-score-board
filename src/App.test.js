import React from "react";
import { render, mount } from "./setupTest";
import App from "./App";
// import { mockRolls, mockTotal } from "../mock";

describe("App component", () => {
  test("snapshot test", () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
  it("updates rolls for general values", () => {
    const wrapper = mount(<App />);
    wrapper
      .find("button")
      .at(2)
      .simulate("click");
    wrapper
      .find("button")
      .at(7)
      .simulate("click");
    expect(
      wrapper
        .find(".card__total")
        .at(0)
        .text()
    ).toBe("9");
    wrapper.unmount();
  });
  it("updates rolls for spare", () => {
    const wrapper = mount(<App />);
    wrapper
      .find("button")
      .at(5)
      .simulate("click");
    expect(
      wrapper
        .find(".first__roll")
        .at(0)
        .text()
    ).toBe("5");
    wrapper.unmount();
  });
  it("updates rolls for strike", () => {
    const wrapper = mount(<App />);
    wrapper
      .find("button")
      .at(10)
      .simulate("click");
    expect(
      wrapper
        .find(".first__roll")
        .at(0)
        .text()
    ).toBe("10");
    wrapper.unmount();
  });

  it("updates rolls for multiple strikes", () => {
    const wrapper = mount(<App />);
    for (let i = 0; i <= 21; i++) {
      wrapper
        .find("button")
        .at(10)
        .simulate("click");
    }
    expect(
      wrapper
        .find(".card__total")
        .at(0)
        .text()
    ).toBe("300");
    wrapper.unmount();
  });
});
