import React from "react";
import AppBar from "../Components/AppBar";
import Card from "../Components/Card";

const LandingPage = () => {
  return (
    <>
      <AppBar />
      <div style={{ height: "50vw" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src="https://lajollamom.com/wp-content/uploads/2019/01/Fairmont-Grand-Del-Mar-luxury-hotel-scaled.jpg"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "50px",
          marginTop: "80px",
        }}
      >
        <Card
          imgSrc={
            "https://th.bing.com/th/id/OIP.eUmRjpZOz3-yqS_-wEwRPQHaE8?w=259&h=180&c=7&r=0&o=5&pid=1.7"
          }
          title={"Premium"}
        />
        <Card
          imgSrc={
            "https://th.bing.com/th/id/R.fd7b996f2e00e3715d4211863b2fdabf?rik=XmXHS9BNUXwGWQ&riu=http%3a%2f%2fwww.bestwesternplusmeridian.com%2fContent%2fimages%2fQueen-Room-o.jpg&ehk=dxP298vmMaLYbbBQz9Ls4IOHAz40HDl8EWe4oVTZd%2f8%3d&risl=&pid=ImgRaw&r=0"
          }
          title={"Business"}
        />
        <Card
          imgSrc={
            "https://th.bing.com/th/id/OIP.6NLV16bzAw5tAwKdmk8JmgAAAA?rs=1&pid=ImgDetMain"
          }
          title={"5 Star"}
        />
      </div>
    </>
  );
};

export default LandingPage;
