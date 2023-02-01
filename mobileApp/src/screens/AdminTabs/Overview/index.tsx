import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../../Components/HeaderBar";
import { Colors } from "../../../ref/colors";
import { LinearGradient } from "expo-linear-gradient";
import AdminTable from "../../../Components/AdminTable";
import { apiendpoint } from "../../../constants/apiendpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Overview = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Samy');
  const [percentage, setPerc] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    handleSubmit()
  }, []);

  const handleSubmit = async () => {
    var jwt = await AsyncStorage.getItem("@jwtauth");
    var user = await AsyncStorage.getItem("userid");
    if (!user) user = "Samy";
    if (!jwt) jwt = "";
    console.log(jwt);
    console.log(user);
    setUsername(user);
    fetch(`${apiendpoint}/manager/OTD-percentage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Credentials": `Bearer ${jwt}`
      },
    }).then(res => {
      console.log(res.status);
      if (res.ok == true) return res.json();
      else throw new Error("Unauthorized");
    }).then(json => {
      setPerc(json.percentage);
      // const saveData = async () => {
      //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
      //   await AsyncStorage.setItem("@role", json.user.role);
      // }
      //saveData();
    }).catch(console.log);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.body}>
        <View>
          <Text style={styles.name}>Welcome, {username}!</Text>
          <Text style={styles.para}>Get a look at the deliveries</Text>
        </View>
        <LinearGradient style={styles.boxDist} colors={["#AE67F9", "#F1966E"]}>
          <Text style={styles.boxDistText}>X Km Distance Travelled</Text>
        </LinearGradient>
        <View style={styles.boxTime}>
          <Text style={styles.boxtTimeText}>{percentage}% Delivered Time</Text>
        </View>
        <View style={styles.table}>
          <ScrollView horizontal={true}>
            <AdminTable /> 
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  textColor: {
    color: Colors.Text,
  },
  body: {
    paddingTop: 25,
    paddingLeft: 40,
    paddingRight: 40,
  },
  boxDist: {
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  boxDistText: {
    color: Colors.Text,
    fontSize: 30,
  },
  boxTime: {
    marginTop: 15,
    width: "100%",
    borderWidth: 2,
    borderColor: "#AE67F9",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  boxtTimeText: {
    color: Colors.Text,
    fontSize: 30,
  },
  namePara: {
    color: Colors.Text,
  },
  name: {
    fontSize: 25,
    color: Colors.Text,
    fontWeight: "bold",
    // fontFamily: "rubik"
  },
  para: {
    marginTop: 15,
    color: Colors.Text,
    fontSize: 20,
  },
  table: {
    marginTop: 15,
  },
});

export default Overview;
