import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from "react";
import { Colors } from "../ref/colors";
import { LinearGradient } from "expo-linear-gradient";
import GradrientText from "./GradientText";

const OrderItem = (props: any) => {
  return (
    <View style={[styles.container, props.transparent ? styles.transparent : styles.opaque]}>
      <Text style={styles.orderName}>{props.name}</Text>
      <GradrientText text={'currently being delivered'} style={styles.ordStatus}/>
      <Text style={styles.contact}>Contact : {props.rider_no}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    paddingLeft: 15,
    width: 300
  },
  transparent: {
    backgroundColor: "rgba(217, 217, 217, 0.1);",
  },
  opaque: {
    backgroundColor: Colors.Background,
  },
  textColor: {
    color: Colors.Text
  },
  contact: {
    justifyItems:'flex-end',
    textAlign:'right',
    color: Colors.Grad1,
    fontWeight: '800',
    fontSize: 10,
  },
  orderName: {
    color: Colors.Theme,
    fontSize: 25,
  },
  ordStatus: {
    color: "#AE67F9",
    paddingVertical: 5
  },
});

export default OrderItem;
