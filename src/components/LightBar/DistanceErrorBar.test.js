import DistanceErrorBar from "./DistanceErrorBar";
import TestRenderer, { act } from "react-test-renderer";
import { render, screen } from "@testing-library/react";

describe("DistanceErrorBar component", () => {
  test("should render left side arrow if errorDistance positive", () => {
    const errorDistance = 2;
    const component = TestRenderer.create(
      <DistanceErrorBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const divElement = tree.children.find(
      (child) => child.props.className === "leftDirection"
    );
    expect(divElement?.props?.className).toBe("leftDirection");
  });

  test("should render right side arrow if errorDistance negative", () => {
    const errorDistance = -2;
    const component = TestRenderer.create(
      <DistanceErrorBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const divElement = tree.children.find(
      (child) => child.props.className === "rightDirection"
    );
    expect(divElement?.props?.className).toBe("rightDirection");
  });

  test("should NOT render any side arrow if errorDistance 0", () => {
    const errorDistance = 0;
    const component = TestRenderer.create(
      <DistanceErrorBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const divElementLeft = tree.children.find(
      (child) => child.props.className === "leftDirection"
    );
    const divElementRight = tree.children.find(
      (child) => child.props.className === "rightDirection"
    );
    expect(divElementLeft?.props?.className).not.toBe("leftDirection");
    expect(divElementRight?.props?.className).not.toBe("rightDirection");
  });

  test("should NOT render any side arrow if errorDistance null/undefined", () => {
    let errorDistance;
    const component = TestRenderer.create(
      <DistanceErrorBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const divElementLeft = tree.children.find(
      (child) => child.props.className === "leftDirection"
    );
    const divElementRight = tree.children.find(
      (child) => child.props.className === "rightDirection"
    );
    expect(divElementLeft?.props?.className).not.toBe("leftDirection");
    expect(divElementRight?.props?.className).not.toBe("rightDirection");
  });

  test("should render value", () => {
    const errorDistance = -2;
    render(<DistanceErrorBar errorDistance={errorDistance} />);
    const paragraphElement = screen.getByText(String(errorDistance));
    expect(paragraphElement).toBeInTheDocument();
  });
});
