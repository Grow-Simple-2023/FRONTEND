import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../../Components/HeaderBar";
import OrderItem from "../../../Components/OrderItems";
import { Colors } from "../../../ref/colors";
import { apiendpoint } from "../../../constants/apiendpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Orders = () => {
  const [orders,setOrder] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    handleSubmit()
  }, []);

  const handleSubmit = async () => {
    var jwt = await AsyncStorage.getItem("@jwtauth");
    var user = await AsyncStorage.getItem("userid");
    if (!user) user = "Samy";
    if (!jwt) jwt = "";
    fetch(`${apiendpoint}/manager/items-in-delivery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Credentials": `Bearer ${jwt}`
      },
    }).then(res => {
      console.log(res.status);
      if (res.ok == true) return res.json();
      else throw new Error("Unauthorized");
    }).then(json => {
      console.log(json["items_in_delivery"][0].items_in_order);
      setOrder(json["items_in_delivery"][0].items_in_order);
      // const saveData = async () => {
      //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
      //   await AsyncStorage.setItem("@role", json.user.role);
      // }
      //saveData();
    }).catch(console.log);
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.orderItems}>
        <ScrollView>
          {orders?.map((order)=>{
            return (
              <OrderItem name={order.title} rider_no={order.phone_number} />
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
