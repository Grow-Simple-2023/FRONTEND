import React from "react";
import OrderItem from "../../components/OrderItem";
import classes from "./Orders.module.css";

const Orders = () => {
  const orders = [
    { name: "Item 1", status: "delivered", rider: "x" },
    { name: "Item 1", status: "delivered", rider: "x" },
    { name: "Item 1", status: "delivered", rider: "y" },
    { name: "Item 1", status: "delivering", rider: "z" },
    { name: "Item 1", status: "delivered", rider: "z" },
    { name: "Item 1", status: "delivered", rider: "y" },
    { name: "Item 1", status: "delivering", rider: "z" },
    { name: "Item 1", status: "delivering", rider: "z" },
    { name: "Item 1", status: "delivered", rider: "x" },
  ];

  let riders = new Set();
  for (let order of orders) {
    riders.add(order.rider);
  }
  riders = Array.from(riders);

  const sortRidersOrder = (rider) => {
    const filterOrders = orders.filter((order) => {
      return order.rider === rider;
    });
    return filterOrders;
  };

  return (
    <div className={classes.orders}>
      {riders.map((rider, index) => {
        return (
          <div key={index}>
            <p className={classes.riderName}>Rider {rider}</p>
            <div className={classes.riderOrders}>
              {sortRidersOrder(rider).map((order, index) => {
                return (
                  <OrderItem
                    key={index}
                    name={order.name}
                    status={order.status}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
