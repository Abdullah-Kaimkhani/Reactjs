import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
            </div>
            <button className="product-button" onClick={() => navigate(`/products/${product.id}`)}>
                View More
            </button>
        </div>
    );
};

export default ProductCard;
