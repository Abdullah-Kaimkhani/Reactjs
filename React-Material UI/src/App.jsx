import React from 'react'
import Header from './Components/Header'
import MediaCard from './Components/MediaCard'
import { Products } from './Components/Product'
import "./App.css";

const App = () => {
  return (
    <>
    <Header/>
    <div className="product-grid">
        {Products.map((product) => (
          <MediaCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default App