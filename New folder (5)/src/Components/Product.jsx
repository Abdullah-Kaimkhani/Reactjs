import React from 'react';
import { Data } from './Data';
import ProductCard from './card';

const Product = () => {
  console.log(Data);
  
  return (
    <>
    <div style={
      {display:"flex",
        flexWrap:"Wrap",
        gap:'30px',
        justifyContent:'center'
      }
    }>
      
   {Data && Data.map((e,i)=>{
    return(
      <ProductCard key={i} id={e.id} name={e.title} imgSrc={e.image} desc={e.description} />
    )

   })}
    </div>
   </>
  );
}

export default Product;
