import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tables from '../Components/Tables';

const Home = () => {
    const [data, setData] = useState(null);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            console.log(err);
            
        })
    }, [])

  return (
    <div>
        
{/* Axios methods */}
{/* get */}
{/* post */}
{/* put */}
{/* delete */}

      <h1>List Users</h1>
      {
        data && <Tables userData={data} />
      }
    </div>
  );
}

export default Home;
