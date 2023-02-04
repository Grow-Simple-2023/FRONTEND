import React, { useLayoutEffect, useEffect, useState } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
import style from "./style";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import OrderItem from "../../../Components/OrderItems";
import GradientText from "../../../Components/GradientText";
import HeaderBar from "../../../Components/HeaderBar";
import { Colors } from "../../../ref/colors";
import { apiendpoint } from "../../../constants/apiendpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReorderScreen = (props: any) => {
  const [orders, setOrders] = useState([]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    setOrders(props.route.params.orders);
  }, [])

  return (
    <SafeAreaView style={style.container}>
      <HeaderBar navigation={props.navigation}/>
      <View>
        {orders?.map((order: any) => {
          return (
            <OrderItem interact={true} transparent name={order.title} rider_no={order.phone_number}/>
          )
        })}
      </View>
    </SafeAreaView>
  );
};

export default ReorderScreen;
