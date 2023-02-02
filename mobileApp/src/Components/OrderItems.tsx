import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../ref/colors";
import { LinearGradient } from "expo-linear-gradient";
import GradrientText from "./GradientText";

const OrderItem = (props) => {
  return (
    <View
      style={[
        styles.container,
        props.transparent ? styles.opaque : styles.transparent
      ]}
    >
      <Text style={styles.orderName}>{props.name}</Text>
      <GradrientText text={props.status} style={styles.ordStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    width: 300,
    height: 100,
    borderRadius: 20,
    padding: 15
  },
  opaque: {
    backgroundColor: Colors.Background
  },
  transparent: {
    backgroundColor: "rgba(217, 217, 217, 0.1);"
  },
  textColor: {
    color: Colors.Text
  },
  orderName: {
    color: "#81AFDD",
    fontSize: 25
  },
  ordStatus: {
    color: "#AE67F9"
  }
});

export default OrderItem;
