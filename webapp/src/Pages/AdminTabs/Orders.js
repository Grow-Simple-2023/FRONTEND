import React, { useEffect, useState } from "react";
import OrderItem from "../../components/OrderItem";
import classes from "./Orders.module.css";
import { apiendpoint } from "../../constants/constans";

const Orders = () => {
  useEffect(() => {
    fetchItemsInDelivery();
  }, []);
  const fetchItemsInDelivery = async () => {
    var jwt = await localStorage.getItem("@jwtauth");
    var user = await localStorage.getItem("userid");
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
        if (res.ok == true) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        setUnassignedOrders(json.items_in_delivery);
        console.log(json.items_in_delivery);
        // const saveData = async () => {
        //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
        //   await AsyncStorage.setItem("@role", json.user.role);
        // }
        //saveData();
      })
      .catch(console.log);
  };

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
  const [unassignedOrders, setUnassignedOrders] = useState(orders);

  // let riders = new Set();
  // for (let order of unassignedOrders) {
  //   riders.add(order.rider_id);
  // }
  // riders = Array.from(riders); // for now rider name is rider_id

  // const sortRidersOrder = (rider_id) => {
  //   const filterOrders = unassignedOrders.filter((order) => {
  //     return order.rider_id === rider_id;
  //   });
  //   return filterOrders;
  // };

  return (
    <div className={classes.orders}>
      {unassignedOrders.map((rider, index) => {
        return (
          <div key={index}>
            <p className={classes.riderName}>Rider {rider.rider_id}</p>
            <div className={classes.riderOrders}>
              {rider?.items_in_order.map((order, index) => {
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
