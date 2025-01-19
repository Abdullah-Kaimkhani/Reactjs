import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const User = () => {
    // const {id} = useParams()
    // console.log(id);

    const [query, setQuery] = useSearchParams(); 
    console.log(query.get('name'));
    console.log(query.get('age'));
    console.log(query.get('city'));
    
    
    
    
  return (
    <div>
        {/* <h1>{id}</h1> */}
      <h1>User Page</h1>
    </div>
  )
}

export default User
