import React from 'react';
import { useDispatch } from 'react-redux';
import { addCounter, delCounter } from '../store/slices/CounterSlice';

const Button = () => {
    const dispatch = useDispatch();
    const Increment = ()=>{
        dispatch(addCounter())
    }
    const Decrement = ()=> {
        dispatch(delCounter())
    }
  return (
    <div>
      <button onClick={Increment}>Add</button>
      <button onClick={Decrement}>Del</button>
    </div>
  );
}

export default Button;
