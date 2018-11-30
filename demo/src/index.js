import React, { Component } from "react";
import { render } from "react-dom";

import Example from "../../src";

class Demo extends Component {
  state = {
    w: 100,
    h: 100,
    x: 50,
    y: 50,
    z: 1000,
    e: true
  };

  position = ({w, h, x, y}) => this.setState({
    w,
    h,
    x,
    y
  });

  render() {
    const { state } = this;
    const { w, h, x, y, z, e } = state;

    return (
      <div>
        <Example w={100} h={100} x={10} y={10} z={10} draggable={false} color="#ff0000">
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "#666666" }}
          />
        </Example>

        <Example w={100} h={100} x={30} y={30} z={100} draggable={false} color="#ff0000">
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "#999999" }}
          />
        </Example>

        <Example w={w} h={h} x={x} y={y} z={z} draggable={e} onFinish={this.position} color="#ff0000">
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "#cccccc" }}
          />
        </Example>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
