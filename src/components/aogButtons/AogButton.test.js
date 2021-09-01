import { render } from "@testing-library/react";
import { AogButton } from "./AogButton";
import TestRenderer, { act } from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import manualSection from "../../icons/ManualOff.png";

describe("AogButton component", () => {
  const props = {
    buttonName: "1",
    name: "section1",
    imagePath: "",
    type: "ACTION",
    params: "",
    id: 1,
    cssClassName: "sections",
    buttonState: null,
  };
  test("section button should have name", () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <AogButton props={props} />
      </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree.children).toContain("1");
  });

  test("section button should NOT have image", () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <AogButton props={props} />
      </MockedProvider>
    );
    const jsonProps = component.toJSON();
    expect(jsonProps.type).not.toContain("img");
  });

  test("button should change class after click", () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <AogButton props={props} />
      </MockedProvider>
    );
    const button = component.root.findByType("button");
    act(() => {
      button.props.onClick();
    });
    const jsonProps = component.toJSON();
    expect(jsonProps.props.className).toContain("isClicked");
  });

  const props2 = {
    buttonName: "ManualSection",
    name: "sectionManualToggle",
    imagePath: manualSection,
    type: "ACTION",
    params: "",
    id: 7,
    cssClassName: "control",
    buttonState: null,
  };
  test("sectionManualToggle button should NOT have name", () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <AogButton props={props2} />
      </MockedProvider>
    );
    const tree = component.toJSON();
    // console.log(tree);
    expect(tree.children).not.toContain(props.buttonName);
  });

  test("sectionManualToggle button should have child image", () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]}>
        <AogButton props={props2} />
      </MockedProvider>
    );
    const jsonProps = component.toJSON();
    expect(jsonProps.children[0].type).toContain("img");
  });
});
