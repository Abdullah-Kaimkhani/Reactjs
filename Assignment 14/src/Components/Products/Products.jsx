import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "./ProductCard"; // Import the new component

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Explore Our Products</h1>
                <p>Find the best items curated just for you</p>
            </header>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
