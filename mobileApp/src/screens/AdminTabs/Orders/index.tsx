import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../../Components/HeaderBar";
import OrderItem from "../../../Components/OrderItems";
import { Colors } from "../../../ref/colors";

const Orders = () => {
  const orders = [
    { name: "Item 1", status: "delivered" },
    { name: "Item 1", status: "delivered" },
    { name: "Item 1", status: "delivered" },
    { name: "Item 1", status: "delivering" },
    { name: "Item 1", status: "delivered" },
    { name: "Item 1", status: "delivered" },
    { name: "Item 1", status: "delivering" },
    { name: "Item 1", status: "delivering" },
    { name: "Item 1", status: "delivered" },
  ];
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.orderItems}>
        <ScrollView>
          {orders.map((order)=>{
            return (
              <OrderItem name={order.name} status={order.status} />
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  orderItems: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 25,
    // paddingBottom: 50,
    marginBottom: 60
  },
});

export default Orders;
