import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SmartphoneCards() {
  const products = [
    {
      id: 1,
      image: "https://image01.realme.net/general/20241212/1733967866096fa2982967549485db8c3259a0f9a1fe7.png.webp",
      title: "realme C75",
      subtitle: "Dhulai Horai Hai",
      price: null,
      isNew: true,
    },
    {
      id: 2,
      image: "https://image01.realme.net/general/20241108/1731062061605d960daec82634da8ae53a2b5bba2b081.png.webp",
      title: "realme 13+ 5G",
      subtitle: "Speed to Victory",
      price: "89,999",
      isNew: true,
    },
    {
      id: 3,
      image: "https://www.picclickimg.com/PcsAAOSwlu5nXYUu/Realme-GT6-16-512GB-678-5G-Fluid.webp",
      title: "realme GT 6",
      subtitle: "Power meets AI",
      price: "149,999",
      isNew: true,
    },
    {
      id: 4,
      image: "https://th.bing.com/th/id/OIP.pH3uzo15s_Iqy672iVSVXgHaHa?rs=1&pid=ImgDetMain",
      title: "realme Note 60",
      subtitle: "Champion Quality",
      price: "26,999",
      isNew: true,
    },
    {
      id: 5,
      image: "https://th.bing.com/th/id/OIP.JNUjZ2XCTGqnRx4GKjGEMAHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: "realme C61",
      subtitle: "Champion to Break",
      price: "32,999",
      isNew: true,
    },
    {
      id: 6,
      image: "https://mobee.hu/wp-content/uploads/2022/06/realme-c65-szerviz-1536x1534.png",
      title: "realme C65",
      subtitle: "Unbreakable Champion",
      price: "49,999",
      isNew: true,
    },
    {
      id: 7,
      image: "https://gagadget.com/media/uploads/realme-12-5g-2.png",
      title: "realme 12",
      subtitle: "Power in Every Shot",
      price: "59,999",
      isNew: true,
    },
    {
      id: 8,
      image: "https://th.bing.com/th/id/OIP.tuMUoevfPB3kXOTQ05oB3AHaHa?rs=1&pid=ImgDetMain",
      title: "realme 12+ 5G",
      subtitle: "Power in Every Shot",
      price: "74,999",
      isNew: true,
    },
    {
      id: 9,
      image: "https://th.bing.com/th/id/OIP.-QOl-htPleK6kRAj0H-CeAHaHa?rs=1&pid=ImgDetMain",
      title: "realme C63",
      subtitle: "3 min Charge, 60 min T20 Match",
      price: "39,999",
      isNew: true,
    },
    {
      id: 10,
      image: "https://th.bing.com/th/id/OIP.g-2T1q4bCo4NhjW7ijuW6AHaHa?rs=1&pid=ImgDetMain",
      title: "realme Note 50",
      subtitle: "Long-lasting Value Beast",
      price: "26,999",
      isNew: true,
    },
    {
      id: 11,
      image: "https://th.bing.com/th/id/OIP.E6W894oAGKjxQugsdbK_WgHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title: "realme C67",
      subtitle: "108MP 3x In-sensor Zoom Camera,\nSnapdragon 685", // Use \n for line break
      price: "26,999",
      isNew: true,
    },
    {
      id: 12,
      image: "https://th.bing.com/th/id/OIP.JDIKpKcdTuncRjPRvfIH2AHaHa?rs=1&pid=ImgDetMain",
      title: "realme C53",
      subtitle: "Champion Gold, 33W Champion\nCharge", // Use \n for line break
      price: "26,999",
      isNew: true,
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-5">SmartPhones</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-6" key={product.id}>
            <div className="card shadow-sm p-5">
              <div className="row g-0 align-items-center">
                {/* Left Side: Text */}
                <div className="col-md-8">
                  <div className="card-body">
                    {product.isNew && (
                      <span className="badge bg-info text-white mb-2">NEW</span>
                    )}
                    <h5 className="card-title fw-bold">{product.title}</h5>
                    {/* Break the line in subtitle */}
                    <p className="card-text text-muted">
                      {product.subtitle.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                    {product.price && (
                      <p className="card-text">
                        {(product.id === 4 || product.id === 10) && (
                          <span className="text-muted custom-font">From </span>
                        )}
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
                    className="img-fluid rounded"
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

export default SmartphoneCards;
