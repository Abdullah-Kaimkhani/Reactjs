import React from "react";
import "./App.css";
import ProductCard from "./Components/ProductCard/ProductCard";
import { Products } from "./Products";

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Explore Our Products</h1>
        <p>Find the best items curated just for you</p>
      </header>
      <div className="product-grid">
        {Products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
