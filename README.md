
# react-transform-layer

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status](https://coveralls.io/repos/github/exilee20c/react-transform-layer/badge.svg?branch=master)](https://coveralls.io/github/exilee20c/react-transform-layer?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fexilee20c%2Freact-transform-layer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fexilee20c%2Freact-transform-layer?ref=badge_shield)

use with react, it works like free transform layer of photoshop-like...

## USAGE

```javascript
import React, { Component } from "react";
import { render } from "react-dom";

import Positioner from "react-transform-layer";

class TheContainer extends Component {
  state = {
    w: 100,   // Positioner's width
    h: 100,   // Positioner's height
    x: 50,    // Positioner's x of coordinates
    y: 50,    // Positioner's y of coordinates
    z: 1000,  // Positioner's z-index
    e: true   // Positioner's boolean value of editable
  };

  position = ({w, h, x, y}) => this.setState({ w, h, x, y });

  render() {
    const { state } = this;
    const { w, h, x, y, z, e } = state;

    return (
      <div>
        <Positioner w={w} h={h} x={x} y={y} z={z} mw={50} mh={50} draggable={e} onFinish={this.position} color="red">
          <div style={{ width: "100%", height: "100%", backgroundColor: "#cccccc" }} />
        </Positioner>
      </div>
    );
  }
}

render(<TheContainer />, document.querySelector("#root"));
```

* import default of "react-transform-layer"

* give props ```w, h, x, y, z, mw, mh, draggable, onFinish, color``` as above code block

* w stands for **'width'** (required number)

* h stands for **'height'** (required number)

* x means for **'x of coordinates'** (required number)

* y means for **'y of coordinates'** (required number)

* mw stands for **'minimum width'** (required number)

* mh stands for **'minimum height'** (required number)

* draggable is boolean that you can drag and change its poistion (nullable boolean, default false)

* onFinish is callback function called when you release the mouse drag and its changes of poistion will committed (required function)

* color will be accepted into positioner's eight anchors as inline style. eg. red, blue, rgba(0, 255, 0, 0.6), #ff0000 (nullable string)

[build-badge]: https://img.shields.io/travis/exilee20c/react-transform-layer/master.png?style=flat-square
[build]: https://travis-ci.org/exilee20c/react-transform-layer

[npm-badge]: https://img.shields.io/npm/v/react-transform-layer.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-transform-layer

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fexilee20c%2Freact-transform-layer.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fexilee20c%2Freact-transform-layer?ref=badge_large)