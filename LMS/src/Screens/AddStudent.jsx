import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const AddStudent = () => {
  const [detail, setDetail] = useState({
    name: "",
    fatherName: "",
    email: "",
    class: "",
    gender: ""
  })
  return (
    <Paper
      elevation={3}
      sx={{ width: '40vw', marginX: 'auto', padding: 5 }}
    >
      <Typography
        variant='h5'
        sx={{ textAlign: 'center', marginBottom: 2 }}
      >
        Add Student
      </Typography>
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, name: e.target.value })
        }}
        fullWidth
        label='Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, fatherName: e.target.value })
        }}
        fullWidth
        label='Father Name'
      />
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, email: e.target.value })
        }}
        fullWidth
        label='Email'
      /> 
      <br /><br />
      <TextField
        onChange={(e) => {
          setDetail({ ...detail, class: e.target.value })
        }}
        fullWidth
        label='Class'
      />
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={detail.gender}
          onChange={()=>{
            setDetail({...detail, gender: e.target.value})
          }}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <br /><br />
      <Button
        // onClick={createUser}
        fullWidth
        variant='contained'
        color='success'
        sx={{ marginBottom: 3 }}>
        Add
      </Button>
      <Button
        onClick={() => {
          navigate('/')
        }}
        fullWidth
        variant='contained'
        color='error'>
        Back
      </Button>
    </Paper>
  )
}

export default AddStudent