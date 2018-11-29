import React, { Component } from "react";
import { render } from "react-dom";

import Example from "../../src";

class Demo extends Component {
  state = {
    w: 100,
    h: 100,
    x: 10,
    y: 10,
    e: true
  };

  render() {
    const { state } = this;
    const { w, h, x, y, e } = state;

    return (
      <div>
        <Example w={w} h={h} x={x} y={y} z={100} d={true} c="#ff0000" e={e}>
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "teal" }}
          />
        </Example>

        <Example w={30} h={30} x={40} y={40} z={0} d={false}>
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "blue" }}
          />
        </Example>

        <Example w={50} h={50} x={90} y={90} z={1000} d={false}>
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "black" }}
          />
        </Example>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
