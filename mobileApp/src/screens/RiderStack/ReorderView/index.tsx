import React, { useLayoutEffect, useEffect, useState } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import OrderItem from "../../../Components/RiderItems";
import GradientText from "../../../Components/GradientText";
import HeaderBar from "../../../Components/HeaderBar";
import { Colors } from "../../../ref/colors";
import { apiendpoint } from "../../../constants/apiendpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReorderScreen = (props: any) => {

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView style={style.container}>
    </SafeAreaView>
  );
};

export default ReorderScreen;
