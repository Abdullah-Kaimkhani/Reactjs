import React, { useState } from 'react';
import Input from '../Components/Input';
import {UserTable} from '../Components/Table';

const Registration_form = () => {
  const [array, setArray] = useState([]);
  const [userObj, setUserObj] = useState({
    userName: '',
    userEmail: '',
    userPass: ''
  });

  const handleSubmit = () => {
    setArray([...array, userObj]);
    // Clear user inputs after adding to array (optional)
    setUserObj({
      userName: '',
      userEmail: '',
      userPass: ''
    });
  };

  return (
    <>
      <h1>Registration Form Component</h1>
      <Input
        label="Enter name"
        placeholder="Enter name"
        type="text"
        value={userObj.userName}
        onchangeEvent={(e) => setUserObj({ ...userObj, userName: e.target.value })}
      />
      <br /><br />
      <Input
        label="Enter email"
        placeholder="Enter email"
        type="email"
        value={userObj.userEmail}
        onchangeEvent={(e) => setUserObj({ ...userObj, userEmail: e.target.value })}
      />
      <br /><br />
      <Input
        label="Enter password"
        placeholder="Enter password"
        type="password"
        value={userObj.userPass}
        onchangeEvent={(e) => setUserObj({ ...userObj, userPass: e.target.value })}
      />
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>


    <UserTable data={array} />
    </>
  );
};

export default Registration_form;
