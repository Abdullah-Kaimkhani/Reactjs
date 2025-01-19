import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();


    const obj = {
        name: "Abdullah",
        age: 20
    }

    const goAbout= ()=>{
        navigate('/about', {state:obj})
    }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goAbout}>Go to About Page</button>
    </div>
  )
}

export default Home
