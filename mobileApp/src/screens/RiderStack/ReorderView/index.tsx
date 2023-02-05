import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import OrderItem from "../../../Components/OrderItems";
import HeaderBar from "../../../Components/HeaderBar";
import { Colors } from "../../../ref/colors";
import { apiendpoint } from "../../../constants/apiendpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReorderScreen = (props: any) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(-1);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    setOrders(props.route.params.orders);
  }, []);

  const reorderFunc = async () => {
    var phoneNO = await AsyncStorage.getItem("userid");
    var jwt = await AsyncStorage.getItem("@jwtauth");
    if (!jwt) jwt = "";
    console.log(jwt);
    console.log(phoneNO);
    fetch(`${apiendpoint}/rider/route/${phoneNO}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res: any) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json: any) => {
        console.log(JSON.stringify(json, null, 2));
      })
      .catch(console.log);
  };

  const swapElements = (index1: number, index2: number) => {
    var temp = orders;
    temp[index1] = temp.splice(index2, 1, temp[index1])[0];
    setOrders(temp);
    setOrder(-1);
  };

  const shiftUp = () => {
    const ind = orders.indexOf(orders.filter((ord) => ord.id === order)[0]);
    if (ind === 0) return;
    swapElements(ind, ind - 1);
  };

  const shiftDown = () => {
    const ind = orders.indexOf(orders.filter((ord) => ord.id === order)[0]);
    if (ind === orders.length - 1) return;
    swapElements(ind, ind + 1);
  };

  return (
    <SafeAreaView style={style.container}>
      <HeaderBar navigation={props.navigation} />
      <ScrollView>
        {orders?.map((order: any) => {
          return (
            <TouchableOpacity
              onPress={() =>
                setOrder((prevState) =>
                  prevState === order.id ? -1 : order.id
                )
              }
            >
              <OrderItem
                transparent
                name={order.title}
                rider_no={order.phone_number}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={reorderFunc}
        style={{
          bottom: 0,
          margin: 20,
          padding: 10,
          borderRadius: 10,
          position: "absolute",
          backgroundColor: Colors.Accent
        }}
      >
        <Text style={{ color: Colors.Text }}>Reorder</Text>
      </TouchableOpacity>
      {order !== -1 && (
        <View>
          <Text style={{ color: Colors.Text, textAlign: "center" }}>
            Shift {orders.filter((ord) => ord.id === order)[0].title} ?
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: Dimensions.get("screen").width,
              padding: 20
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: Colors.Accent
              }}
              onPress={shiftUp}
            >
              <Image
                source={require("../../../../assets/icons-up.svg")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: Colors.Accent
              }}
              onPress={shiftDown}
            >
              <Image
                source={require("../../../../assets/icons-down.svg")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReorderScreen;
