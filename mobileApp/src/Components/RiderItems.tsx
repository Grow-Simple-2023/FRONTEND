import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../ref/colors";
import GradrientText from './GradientText'

const OrderItem = (props: any) => {

  return (
    <TouchableOpacity onPress={() => props.setDelivering(props.order)} style={[styles.container, props.transparent ? styles.transparent : styles.opaque]}>
      <Text style={styles.orderName}>{props.name}</Text>
    
        <GradrientText text={props.delivering.id === props.order.id?"currently delivering":''} style={styles.ordStatus}/>
    
      <TouchableOpacity onPress={() => props.showModal(props.order)} style={styles.cancelContainer}>
        <Text style={styles.cancelbutton}>Delivered</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: Colors.Text,
  },
  cancelContainer: {
    backgroundColor: Colors.Accent,
    fontWeight: '800',
    fontSize: 15,
    padding: 4,
    borderRadius: 8,
    width: "30%"
  },
  cancelbutton: {
    textAlign:'center',
    color: Colors.Text,
    fontWeight: '800',
    fontSize: 15,
  },
  orderName: {
    color: Colors.Theme,
    fontSize: 25,
  },
  ordStatus: {
    paddingVertical: 5
  },
});

export default OrderItem;