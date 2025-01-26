import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Data } from "./Data";
import styles from "./CardDetails.module.css"; // Import the CSS module

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert the `id` from string to number for calculations
  const currentProductId = parseInt(id);

  // Find the product using the current product ID
  const product = Data.find((e) => e.id === currentProductId);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleBack = () => {
    navigate('/'); // Go back to the previous page
  };

  const handleLeftButton = () => {
    // Navigate to the previous product (id-1)
    const prevProductId = currentProductId - 1;
    // Check if the previous product exists
    if (Data.some((e) => e.id === prevProductId)) {
      navigate(`/CardDeatail/${prevProductId}`);
    } else {
      console.log("No previous product found.");
    }
  };

  const handleRightButton = () => {
    // Navigate to the next product (id+1)
    const nextProductId = currentProductId + 1;
    // Check if the next product exists
    if (Data.some((e) => e.id === nextProductId)) {
      navigate(`/CardDeatail/${nextProductId}`);
    } else {
      console.log("No next product found.");
    }
  };

  return (
    <div className={styles.cardDetailsContainer}>
      <img src={product.image} alt={product.title} className={styles.cardImage} />
      <h1 className={styles.cardTitle}>{product.title}</h1>
      <h2 className={styles.cardCategory}>{product.category}</h2>
      <h3 className={styles.cardPrice}>${product.price}</h3>
      <div className={styles.cardRating}>
        <span>{product.rating.rate}</span>
        <span className={styles.ratingCount}>({product.rating.count} reviews)</span>
      </div>
      <p className={styles.cardDescription}>{product.description}</p>
      
      {/* Buttons for navigation */}
       
        <button className={styles.backButton} onClick={handleBack}>
          Back to Products
        </button>
       
    </div>
  );
};

export default CardDetails;
