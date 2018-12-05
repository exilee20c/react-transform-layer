import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Component from "src/";

describe("Component", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("props seccess", () => {
    render(
      <Component w={100} h={100} x={10} y={10} z={10} mw={50} mh={50} draggable={true} onFinish={() => {}} color="red">
        <div style={{ width: "100%", height: "100%", backgroundColor: "#cccccc" }} />
      </Component>,
      node,
      () => {
        expect(node.innerHTML).toContain('style="width: 100px; height: 100px; left: 10px; top: 10px; z-index: 100;"');
      }
    );
  });
});
