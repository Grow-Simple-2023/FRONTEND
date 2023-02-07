import React, { useEffect, useState } from "react";
import OrderItem from "../../components/OrderItem";
import classes from "./Orders.module.css";
import { apiendpoint } from "../../constants/constans";

const Orders = () => {
  useEffect(() => {
    fetchItemsInDelivery();
  }, []);
  const fetchItemsInDelivery = async () => {
    var jwt = localStorage.getItem("@jwtauth");
    var user = localStorage.getItem("userid");
    if (!user) user = "Samy";
    if (!jwt) jwt = "";
    fetch(`${apiendpoint}/manager/items-in-delivery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Credentials: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok === true) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        setUnassignedOrders(json.items_in_delivery);
        console.log(json.items_in_delivery);
      })
      .catch(console.log);
  };

  const [unassignedOrders, setUnassignedOrders] = useState([]);

  return (
    <div className={classes.orders}>
      {unassignedOrders?.map((rider, index) => {
        return (
          <div key={index}>
            <p className={classes.riderName}>Rider {rider?.rider_id}</p>
            <div className={classes.riderOrders}>
              {rider?.items_in_order?.map((order, index) => {
                return (
                  <OrderItem
                    key={index}
                    name={order.title}
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
