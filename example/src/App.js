import React from 'react'

import StarSky from 'react-star-sky'

const App = () => {
  return (
    <div className='app-wrapper'>
      <StarSky
        // debugFPS={true}
        pageBackground={true}
        // shuffle={0}
        // starColor='white'
        frameRate={30}
      />

      <StarSky
        debugFPS={false}
        pageBackground={false}
        starColor={[0, 0, 255]}
        backgroundColor={[0, 0, 10]}
        style={{
          width: '300px',
          height: '300px',
          margin: '0 auto',
          marginTop: '100px',
          border: '1px solid grey',
          borderRadius: '10px',
          padding: '5px'
        }}
      >
        <h2>Example Star Skies</h2>
        You can easily place objects in front of the star sky. The star sky wrapper simply acts as div in which the canvas is contained as a background.<br />
        For full documentation, see the readme on github.
      </StarSky>
    </div>
  )
}

export default App
