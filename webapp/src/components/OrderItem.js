import React from "react";

const OrderItem = (props) => {
  return (
    <div
      style={{
        width: "18rem",
        background: "rgb(26, 33, 43)",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "1rem",
      }}
    >
      <p
        style={{ color: "#81AFDD", fontSize: "1.5rem", marginBottom: "0.5rem" }}
      >
        {props.name}
      </p>
      <p className="textGradient">status : {props.status}</p>
    </div>
  );
};

export default OrderItem;
