import TestRenderer from "react-test-renderer";
import LightBar from "./LightBar";

describe("LightBar component", () => {
  test("should light no bar if error distance 0", () => {
    const errorDistance = 0;
    const component = TestRenderer.create(
      <LightBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const renderedArray = tree.children.map(
      (child) =>
        child.children[0].props.style.borderColor !== "rgb(223, 221, 221)"
    );
    const expectedArray = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    expect(renderedArray).toMatchObject(expectedArray);
  });
  test("should light 1 left and center ligthbar if error distance 5 positive", () => {
    const errorDistance = 5;
    const component = TestRenderer.create(
      <LightBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const renderedArray = tree.children.map(
      (child) =>
        child.children[0].props.style.borderColor !== "rgb(223, 221, 221)"
    );
    const expectedArray = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    expect(renderedArray).toMatchObject(expectedArray);
  });
  test("should light 2 right and center ligthbar if error distance 9 negative", () => {
    const errorDistance = -9;
    const component = TestRenderer.create(
      <LightBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const renderedArray = tree.children.map(
      (child) =>
        child.children[0].props.style.borderColor !== "rgb(223, 221, 221)"
    );
    const expectedArray = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    expect(renderedArray).toMatchObject(expectedArray);
  });

  test("should light NO bar if error distance null", () => {
    let errorDistance;
    const component = TestRenderer.create(
      <LightBar errorDistance={errorDistance} />
    );
    const tree = component.toJSON();
    const renderedArray = tree.children.map(
      (child) =>
        child.children[0].props.style.borderColor !== "rgb(223, 221, 221)"
    );
    const expectedArray = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    expect(renderedArray).toMatchObject(expectedArray);
  });
});
