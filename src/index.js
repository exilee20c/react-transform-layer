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
    },
    factor_map: {
      Control: false,
      Shift: false
    }
  };

  makeActivor = anc => ({ clientX, clientY }) =>
    this.setState(({ press_map, origin_map }) => ({
      press_map: { ...press_map, [anc]: true },
      origin_map: { ...origin_map, x: clientX, y: clientY }
    }));

  makeDeactivor = anc => () => {
    const { onFinish } = this.props;
    const { w, h, x, y } = this.getRect();

    this.setState(
      ({ press_map }) => ({
        press_map: { ...press_map, [anc]: false },
        origin_map: {
          x: 0,
          y: 0
        },
        delta_map: {
          x: 0,
          y: 0
        }
      }),
      () => onFinish({ w, h, x, y })
    );
  };

  moveAnchor = ({ clientX: cx, clientY: cy, buttons }) => {
    const { press_map, origin_map } = this.state;
    const { onFinish } = this.props;
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
        const { w, h, x, y } = this.getRect();

        this.setState(
          {
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
            },
            delta_map: {
              x: 0,
              y: 0
            }
          },
          () => onFinish({ w, h, x, y })
        );
      }
    }
  };

  setMoveFactor = ({ key }) =>
    (key === "Control" || key === "Shift") &&
    this.setState(({ factor_map }) => ({
      factor_map: { ...factor_map, [key]: true }
    }));

  unsetMoveFactor = ({ key }) =>
    (key === "Control" || key === "Shift") &&
    this.setState(({ factor_map }) => ({
      factor_map: { ...factor_map, [key]: false }
    }));

  getRect = () => {
    const { props, state } = this;

    const { w, h, x, y } = props;
    const { delta_map, press_map, factor_map } = state;

    const { x: d_x, y: d_y } = delta_map;
    const { t_l, t_c, t_r, m_l, m_c, m_r, b_l, b_c, b_r } = press_map;
    const { Control, Shift } = factor_map;

    const d_w_s = t_r || m_r || b_r ? 1 : t_l || m_l || b_l ? -1 : 0;
    const d_h_s = b_l || b_c || b_r ? 1 : t_l || t_c || t_r ? -1 : 0;
    const d_x_s = m_c || t_l || m_l || b_l ? 1 : 0;
    const d_y_s = m_c || t_l || t_c || t_r ? 1 : 0;

    const c_d_w_s = t_r || m_r || b_r ? 1 : t_l || m_l || b_l ? -1 : 0;
    const c_d_h_s = b_l || b_c || b_r ? 1 : t_l || t_c || t_r ? -1 : 0;
    const c_d_x_s = t_r || m_r || b_r ? -1 : 0;
    const c_d_y_s = b_l || b_c || b_r ? -1 : 0;

    return {
      w: w + ((Control ? c_d_w_s : 0) + d_w_s) * d_x,
      h: h + ((Control ? c_d_h_s : 0) + d_h_s) * d_y,
      x: x + ((Control ? c_d_x_s : 0) + d_x_s) * d_x,
      y: y + ((Control ? c_d_y_s : 0) + d_y_s) * d_y
    };
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.moveAnchor);
    window.addEventListener("keydown", this.setMoveFactor);
    window.addEventListener("keyup", this.unsetMoveFactor);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.moveAnchor);
    window.removeEventListener("keydown", this.setMoveFactor);
    window.removeEventListener("keyup", this.unsetMoveFactor);
  }

  render() {
    const { props, state } = this;

    const { children, z, draggable, color } = props;
    const { press_map } = state;

    const { t_l, t_c, t_r, m_l, m_c, m_r, b_l, b_c, b_r } = press_map;

    const { w: width, h: height, x: left, y: top } = this.getRect();

    const Z_MAP = {
      WRAPPER: z + "0"
    };

    return (
      <div
        className="exl-transform"
        style={{
          width,
          height,
          left,
          top,
          zIndex: Z_MAP.WRAPPER
        }}
      >
        {draggable && (
          <div style={{ color }} className="exl-transform-anchors">
            <div
              style={{ cursor: "nwse-resize" }}
              onMouseDown={this.makeActivor("t_l")}
              onMouseUp={this.makeDeactivor("t_l")}
              className={`exl-transform-anchor top left ${t_l ? " fill" : ""}`}
            />
            <div
              style={{ cursor: "ns-resize" }}
              onMouseDown={this.makeActivor("t_c")}
              onMouseUp={this.makeDeactivor("t_c")}
              className={`exl-transform-anchor top center ${
                t_c ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "nesw-resize" }}
              onMouseDown={this.makeActivor("t_r")}
              onMouseUp={this.makeDeactivor("t_r")}
              className={`exl-transform-anchor top right ${t_r ? " fill" : ""}`}
            />
            <div
              style={{ cursor: "ew-resize" }}
              onMouseDown={this.makeActivor("m_l")}
              onMouseUp={this.makeDeactivor("m_l")}
              className={`exl-transform-anchor middle left ${
                m_l ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "move" }}
              onMouseDown={this.makeActivor("m_c")}
              onMouseUp={this.makeDeactivor("m_c")}
              className={`exl-transform-anchor middle center ${
                m_c ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "ew-resize" }}
              onMouseDown={this.makeActivor("m_r")}
              onMouseUp={this.makeDeactivor("m_r")}
              className={`exl-transform-anchor middle right ${
                m_r ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "nesw-resize" }}
              onMouseDown={this.makeActivor("b_l")}
              onMouseUp={this.makeDeactivor("b_l")}
              className={`exl-transform-anchor bottom left ${
                b_l ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "ns-resize" }}
              onMouseDown={this.makeActivor("b_c")}
              onMouseUp={this.makeDeactivor("b_c")}
              className={`exl-transform-anchor bottom center ${
                b_c ? " fill" : ""
              }`}
            />
            <div
              style={{ cursor: "nwse-resize" }}
              onMouseDown={this.makeActivor("b_r")}
              onMouseUp={this.makeDeactivor("b_r")}
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
