import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../AccessoriesCards/AccessoriesCards.module.css";

function AccessoriesCards() {
  const products = [
    {
      id: 1,
      image: "https://i.gadgets360cdn.com/products/large/realme-buds-t110-realme-db-847x800-1713176529.jpg",
      title: "realme Buds T110",
      subtitle: "Listen in Full Color",
      price: "4,999",
      isNew: true,
    },
    {
      id: 2,
      image: "https://www.startech.com.bd/image/cache/catalog/earphone/realme/rma215-buds-q/rma215-buds-q-500x500.jpg",
      title: "realme Buds Q",
      subtitle: "Music Never Ends",
      price: "7,999",
      isNew: false,
    },
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Accessories</h1>
        <div>
          <a href="#" className="me-3 text-decoration-none text-dark fw-bold pe-4">
            Audio
          </a>
          <a href="#" className={`${styles.customFont} fs-6 text-dark text-decoration-none`}>
            Smart Wearable
          </a>
        </div>
      </div>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-6" key={product.id}>
            <div className="card shadow-sm p-5">
              <div className="row g-0 align-items-center">
                {/* Left Side: Text */}
                <div className="col-md-8">
                  <div className="card-body">
                    {product.isNew && (
                      <span className="badge bg-info text-white mb-2">NEW</span>
                    )}
                    <h5 className="card-title fw-bold">{product.title}</h5>
                    <p className="card-text text-muted">{product.subtitle}</p>
                    {product.price && (
                      <p className="card-text">
                        <span className="fw-bold">Rs.{product.price}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side: Image */}
                <div className="col-md-4 text-end">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`img-fluid rounded ${styles.mobileImage}`} // Applying custom class here
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccessoriesCards;
