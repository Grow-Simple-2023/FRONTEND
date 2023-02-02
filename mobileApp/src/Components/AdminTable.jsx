import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../ref/colors";


const AdminTable = (props) => {
  const data = props.data;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.items, styles.head]}>
          <Text style={styles.heading}>Item</Text>
          <View style={styles.content}>
            {data.map((data, index) => {
              return (
                <Text style={styles.entry} key={index}>
                  {data.item}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={[styles.address, styles.head]}>
          <Text style={styles.heading}>Address</Text>
          <View style={styles.content}>
            {data.map((data, index) => {
              return (
                <ScrollView>
                  <Text style={styles.entry} key={index}>
                    {data.address}
                  </Text>
                </ScrollView>
              );
            })}
          </View>
        </View>

        <View style={[styles.edd, styles.head]}>
          <Text style={styles.heading}>edd</Text>
          <View style={styles.content}>
            {data.map((data, index) => {
              return (
                <Text style={styles.entry} key={index}>
                  {data.edd}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={[styles.riders, styles.head]}>
          <Text style={styles.heading}>rider</Text>
          <View style={styles.content}>
            {data.map((data, index) => {
              return (
                <Text style={styles.entry} key={index}>
                  {data.rider}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 800,
  },
  heading: {
    fontSize: 18,
    color: "#81AFDD",
    fontWeight: "bold",
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    // borderRightWidth: 0.5,
  },
  items: {
    width: 80,
  },
  address: {
    width: 120,
  },
  edd: {
    width: 70,
  },
  riders: {
    width: 70,
  },
  head: {
    // paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  entry: {
    fontSize: 13,
    height: 50,
    marginVertical: 10,
    textAlign: "center",
    color: Colors.Text,
    borderBottomColor: "black",
    borderBottomWidth: 0.25,
  },
});

export default AdminTable;
