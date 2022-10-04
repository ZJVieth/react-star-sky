import React, { useRef, useEffect, useState } from 'react'
import w3color from './w3color'

// import p5 from "./p5.min"

import p5 from 'p5'

/* props:
  - debugFPS (default = false)
  - frameRate (int, default = 60fps)
  - style (any styling applying to the wrapper)
  - className (to be applied to the wrapper div)
  - starColor ('rainbow', 'white/red/green/etc'[w3color], [r, g, b])
  - skyColor ('white/red/green/etc'[w3color], [r, g, b], default = [0, 0, 0])
*/

const generateStyle = (
    isPageBackground,
    styleIn) => {

    let output = {
        overflow: 'clip',
        position: 'relative',
        ...styleIn,
    }
    if (isPageBackground)
        output = {
            ...output,
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -100
        }
    return output
}

const StarSky = (props) => {
    const sketchRef = useRef()
    const [sketchStyle, setSketchStyle] = useState(generateStyle(props.isPageBackground, props.style))

    useEffect(() => {
        new p5(sketch, sketchRef.current)
    }, [])

    const sketch = (p) => {

        let colorProp
        // let countProp
        let shuffleProp

        // let nebula
        let starSky
        let bgCol

        p.setup = () => {
            let cnv = p.createCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight, p.P2D)

            // Set the canvas as the background of the div
            cnv.style('position', 'absolute')
            cnv.style('top', 0)
            cnv.style('left', 0)
            cnv.style('z-index', -99)

            p.frameRate(props.frameRate || 60)

            // countProp = props.starCount
            colorProp = props.starColor
            shuffleProp = props.shuffle

            // nebula = new Nebula()
            starSky = new StarSky(props.starCount)

            bgCol = getRGBObject(props.backgroundColor)
        }

        p.draw = () => {
            p.background(bgCol.r, bgCol.g, bgCol.b)
            colorProp = props.starColor

            // if (this.state.resize)
            //     p.resize()

            // nebula.render(this.state.alpha)

            starSky.shuffle()
            starSky.render()

            // if (props.debugFPS) {
            //     let fps = p.int(p._frameRate)
            //     p.fill(255)
            //     p.text(fps, 0, 10)
            // }

        }

        p.resize = () => {
            p.resizeCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight)

            // console.log('Resize', sketchRef.current.offsetWidth, sketchRef.current.offsetHeight)

            p.starSky = null
            p.starSky = new StarSky(props.starCount)

            // this.setState({ resize: false })
        }

        p.windowResized = () => {
            p.resize()
        }

        let StarSky = class {
            constructor(count) {
                count = count || 250
                this.count = p.int(p.random(count - 0.05 * count, count + 0.05 * count))
                this.shufflePerSecond = Math.floor((shuffleProp || 0) * this.count)
                this.shuffleTimer = p.millis()

                this.rainbow = []

                this.brightness = []
                this.x = []
                this.y = []
                this.brightnessOff = []
                this.brightnessIncrement = []
                this.size = []

                // console.log('To', p.width, p.height)

                for (let i = 0; i < this.count; i++) {
                    this.brightness.push(p.int(p.random(0, 255)))
                    this.brightnessOff.push(p.random(0.01, 0.1))
                    this.brightnessIncrement.push(p.random(0.01, 0.02))
                    this.size.push(p.random(1, 3))
                    this.x.push(p.random(0, p.width))
                    this.y.push(p.random(0, p.height))

                    if (colorProp === 'rainbow') {
                        let rbCol = []
                        for (let i = 0; i < 3; i++)
                            rbCol.push(parseInt(p.random(0, 256)))
                        this.rainbow.push(rbCol)
                    }
                }
            }

            shuffle() {
                if (this.shufflePerSecond > 0) {
                    if (p.millis() > this.shuffleTimer + 1000 / this.shufflePerSecond) {
                        let starIndex = Math.floor(Math.random() * this.count)
                        this.x[starIndex] = p.random(0, p.width)
                        this.y[starIndex] = p.random(0, p.height)
                        this.brightness[starIndex] = p.random(0, 20)

                        this.shuffleTimer = p.millis()
                    }
                }
            }

            render() {
                p.noStroke()

                // Set Star Color
                let setColor = getRGBObject(colorProp, [255, 255, 255])

                // Draw Each Star
                for (let i = 0; i < this.count; i++) {

                    // Change to individual star color
                    if (colorProp === 'rainbow')
                        setColor = { r: this.rainbow[i][0], g: this.rainbow[i][1], b: this.rainbow[i][2] }

                    // Fill Star Colour
                    p.fill(setColor.r, setColor.g, setColor.b, this.brightness[i])    // When colorProp isnt set -> white

                    // Draw Star
                    p.ellipse(this.x[i], this.y[i], this.size[i], this.size[i])

                    // Update Brightness of individual star
                    this.brightness[i] = p.max(0, p.min(255, p.noise(this.brightnessOff[i]) * 255))
                    this.brightnessOff[i] += this.brightnessIncrement[i]
                }
            }
        }
    }

    // console.log(sketchStyle)

    return (
        <div
            className={props.className}
            ref={sketchRef}
            style={sketchStyle}
        >
            {props.children}
        </div>
    )
}

export default StarSky


function getRGBObject(input, defaultCol = [0, 0, 0]) {
    let output = { r: defaultCol[0], g: defaultCol[1], b: defaultCol[2] }

    if (input?.length === 3)  // When colorProp is an rgb array
        output = { r: input[0], g: input[1], b: input[2] }

    if (typeof input === 'string') {  // When colorProp is a string containing the color name of a w3color
        let rgbCol = w3color(input).toRgb()
        output = { r: rgbCol.r, g: rgbCol.g, b: rgbCol.b }
    }

    return output
}