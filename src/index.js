import React, { Component } from 'react'
import styles from './styles.module.css'

import p5 from "p5";

/* props:
  - debugFPS (default = false)

*/

export default class StarSky extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      alpha: null
    };
  }

  Sketch = (p) => {

    let nebula;
    let starSky;

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);

      nebula = new Nebula();
      starSky = new StarSky();
    }

    p.draw = () => {
      p.background(0);

      nebula.render(this.state.alpha);

      starSky.render();

      if (this.props.debugFPS) {
        let fps = p.int(p._frameRate);
        p.fill(255);
        p.text(fps, 0, 10);
      }

    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);

      p.starSky = null;
      p.starSky = new StarSky();
    }

    let StarSky = class {
      constructor() {
        this.count = p.int(p.random(100, 500));

        this.brightness = [];
        this.x = [];
        this.y = [];
        this.brightnessOff = [];
        this.brightnessIncrement = [];
        this.size = [];

        for (let i = 0; i < this.count; i++) {
          this.brightness.push(p.int(p.random(0, 255)));
          this.brightnessOff.push(p.random(0.01, 0.1));
          this.brightnessIncrement.push(p.random(0.01, 0.02));
          this.size.push(p.random(1, 3));
          this.x.push(p.random(0, p.width));
          this.y.push(p.random(0, p.height));
        }
      }

      render() {
        for (let i = 0; i < this.count; i++) {
          p.noStroke();
          p.fill(this.brightness[i], this.brightness[i]);
          p.ellipse(this.x[i], this.y[i], this.size[i], this.size[i]);

          this.brightness[i] = p.max(0, p.min(255, p.noise(this.brightnessOff[i]) * 255));
          this.brightnessOff[i] += this.brightnessIncrement[i];
        }
      }
    }

    let Nebula = class {
      render(alpha) {
        if (alpha !== null) {
          if (alpha.length > 0) {
            for (let i = 0; i < p.width / 10; i++) {
              if (alpha[i]) {
                for (let j = 0; j < p.height / 10; j++) {
                  p.fill(alpha[i][j], 0, 0);
                  p.ellipse(i * 10, j * 10, 20, 20);
                }
              }
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);

    this.mounted = true;
  }

  render() {
    return (
      <div className="star-sky-wrapper" style={styles}>
        <div ref={this.myRef}></div>
      </div>
    );
  }
}
