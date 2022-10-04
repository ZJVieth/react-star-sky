# react-star-sky

> A simple, modifiable p5js based background element displaying a randomized and animated star sky.

[![NPM](https://img.shields.io/npm/v/react-star-sky.svg)](https://www.npmjs.com/package/react-star-sky) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-star-sky
```

## Usage

```jsx
import React, { Component } from "react";

import StarSky from "react-star-sky";
import "react-star-sky/dist/index.css";

class Example extends Component {
  render() {
    return <StarSky />;
  }
}
```

## Optional Properties

```jsx
<StarSky
  debugFps={true} // Default = false
  frameRate={30} // Default = 60
  style={{ opacity: 0.5 }} // applied to the div wrapper
  className={""} // applied to the div wrapper
  starColor={"rainbow"} // Default = 'white', options: 'rainbow', 'white/red/green/etc'[w3color], [r, g, b]
  skyColor={[20, 20, 100]} // Default = 'black', options: 'white/red/green/etc'[w3color], [r, g, b]
/>
```

## Potential Future Features

- Nebulas
- Planets
- Falling Stars
- Galaxies
- Star Constellations
- Star Shuffling Mechanic (position change over time)

## License

MIT © [ZJVieth](https://github.com/ZJVieth)
