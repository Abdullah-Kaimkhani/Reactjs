import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-category">{product.category.toUpperCase()}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-price-rating">
          <span className="product-price">${product.price}</span>
          <span className="product-rating">⭐ {product.rating.rate} ({product.rating.count})</span>
        </div>
      </div>
      <button className="product-button">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
