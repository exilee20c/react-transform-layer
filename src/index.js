import React, { Component } from "react";
import "./index.css";

class Positioner extends Component {
  state = {
    delta_map: {
      x: 0,
      y: 0
    },
    origin_map: {
      x: 0,
      y: 0
    },
    press_map: {
      t_l: false,
      t_c: false,
      t_r: false,
      m_l: false,
      m_c: false,
      m_r: false,
      b_l: false,
      b_c: false,
      b_r: false
    }
  };

  makeActivor = anc => ({ clientX, clientY }) =>
    this.setState(({ press_map, origin_map }) => ({
      press_map: { ...press_map, [anc]: true },
      origin_map: { ...origin_map, x: clientX, y: clientY }
    }));

  moveAnchor = ({ clientX: cx, clientY: cy, buttons }) => {
    const { press_map, origin_map } = this.state;
    const { t_l, t_c, t_r, m_l, m_c, m_r, b_l, b_c, b_r } = press_map;
    const { x, y } = origin_map;
    const pressed = t_l || t_c || t_r || m_l || m_c || m_r || b_l || b_c || b_r;

    if (buttons) {
      if (pressed) {
        this.setState(({ delta_map }) => ({
          delta_map: { ...delta_map, x: cx - x, y: cy - y }
        }));
      }
    } else {
      if (pressed) {
        this.setState({
          press_map: {
            t_l: false,
            t_c: false,
            t_r: false,
            m_l: false,
            m_c: false,
            m_r: false,
            b_l: false,
            b_c: false,
            b_r: false
          },
          origin_map: {
            x: 0,
            y: 0
          }
        });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.moveAnchor);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.moveAnchor);
  }

  vvv = () => e => {
    console.log(e.clientX);
  };

  render() {
    const { props, state } = this;
    const { children, w, h, x, y, z, c, e } = props;
    const { press_map } = state;
    const { t_l, t_c, t_r, m_l, m_c, m_r, b_l, b_c, b_r } = press_map;
    // TODO d, z

    const Z_MAP = {
      WRAPPER: z * 10
    };

    return (
      <div
        className="exl-transform"
        style={{
          width: w,
          height: h,
          left: x,
          top: y,
          zIndex: Z_MAP.WRAPPER
        }}
      >
        {e && (
          <div style={{ color: c }} className="exl-transform-anchors">
            <div
              style={{ cursor: "nwse-resize" }}
              onMouseDown={this.makeActivor("t_l")}
              className={`exl-transform-anchor top left ${t_l ? " fill" : ""}`}
            />
            <div
              style={{ cursor: "ns-resize" }}
              onMouseDown={this.makeActivor("t_c")}
              className={`exl-transform-anchor top center ${
                t_c ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "nesw-resize" }}
              onMouseDown={this.makeActivor("t_r")}
              className={`exl-transform-anchor top right ${t_r ? " fill" : ""}`}
            />
            <div
              style={{ cursor: "ew-resize" }}
              onMouseDown={this.makeActivor("m_l")}
              className={`exl-transform-anchor middle left ${
                m_l ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "move" }}
              onMouseDown={this.makeActivor("m_c")}
              className={`exl-transform-anchor middle center ${
                m_c ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "ew-resize" }}
              onMouseDown={this.makeActivor("m_r")}
              className={`exl-transform-anchor middle right ${
                m_r ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "nesw-resize" }}
              onMouseDown={this.makeActivor("b_l")}
              className={`exl-transform-anchor bottom left ${
                b_l ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "ns-resize" }}
              onMouseDown={this.makeActivor("b_c")}
              className={`exl-transform-anchor bottom center ${
                b_c ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "nwse-resize" }}
              onMouseDown={this.makeActivor("b_r")}
              className={`exl-transform-anchor bottom right ${
                b_r ? " fill" : ""
              }`}
            />
          </div>
        )}
        {children}
      </div>
    );
  }
}

export default Positioner;
