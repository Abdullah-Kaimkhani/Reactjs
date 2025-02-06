import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tables from '../Components/Tables';
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
    const [data, setData] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3000/users').then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    console.log(data);
    

  return (
    <div>
      <div>
        
{/* Axios methods */}
{/* get */}
{/* post */}
{/* put */}
{/* delete */}

<Typography
variant='h3'
style={{textAlign: 'center', marginBottom: 30, display: 'inline'}}
>
  List Users
</Typography>
<Button
startIcon={<AddRoundedIcon />}
variant='outlined'
style={{marginLeft: "75%", marginBottom: 3}}
onClick={()=>{navigate('/create')}}
>
  Create
</Button>
</div>
      {
        data && <Tables userData={data} />
      }
    </div>
  );
}

export default Home;
