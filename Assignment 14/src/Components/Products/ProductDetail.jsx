import React, { useState, useEffect } from "react"; // ✅ Add useState & useEffect
import { useParams } from "react-router-dom"; // ✅ Import useParams
import "./Products.css";

const ProductDetail = () => {
  const { productId } = useParams(); // ✅ Get productId from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
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
      </div>
    </div>
  );
};

export default ProductDetail;
