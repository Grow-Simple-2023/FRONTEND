import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
import style from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import OrderItem from "../../../Components/OrderItems";
import GradientText from "../../../Components/GradientText";
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

  const swapElements = (index1, index2) => {
    var temp = orders;
    temp[index1] = temp.splice(index2, 1, temp[index1])[0];
    setOrders(temp);
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
                setOrder((prevState) => (prevState === -1 ? order.id : -1))
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
      {order !== -1 && (
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
              width: 75,
              padding: 10,
              borderRadius: 10,
              backgroundColor: Colors.Accent
            }}
            onPress={shiftUp}
          >
            <Text style={{ color: Colors.Text, textAlign: "center" }}>Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 75,
              padding: 10,
              borderRadius: 10,
              backgroundColor: Colors.Accent
            }}
            onPress={shiftDown}
          >
            <Text style={{ color: Colors.Text, textAlign: "center" }}>
              Down
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReorderScreen;
