import React from 'react'
import { useLocation } from 'react-router-dom'

const About = () => {

    const getData = useLocation()
    console.log(getData.state);
    

  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}

export default About
