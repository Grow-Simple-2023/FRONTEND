import React, {useLayoutEffect, useEffect, useState} from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import OrderItem from "../../Components/OrderItems";
import GradientText from "../../Components/GradientText";




const RiderScreen = () => {
  const { width } = Dimensions.get('window');
  const orders = [
    { name: "Item 1", status: "delivered" },
    { name: "Item 1", status: "Started delivering" },
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
  var scrollView=null;
  useState(() => {
    setTimeout(() => {
      console.log(scrollView);
      if(scrollView!=null)
        scrollView.scrollTo({x: -30}) }, 1000)
  });
  return (
    <SafeAreaView style={style.container}>
      <View style={{backgroundColor: 'cyan',height: '100%', width: '100%',flex: 1,position: 'absolute'}}></View>
      <View style={style.scrollviewstyle}>
        <View style={style.separatornotch}><GradientText/></View>
        <View style={style.orderItems}>
          <ScrollView
            ref={(scrollViewValue) => { scrollView = scrollViewValue}}
            pagingEnabled={true}
            horizontal= {true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={"center"}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
              {orders.map((order)=>{
                return (
                  <OrderItem name={order.name} status={order.status} />
                )
              })}
            </ScrollView>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default RiderScreen;
