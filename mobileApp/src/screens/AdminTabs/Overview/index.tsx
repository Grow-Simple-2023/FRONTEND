import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../../Components/HeaderBar";
import { Colors } from "../../../ref/colors";
import { LinearGradient } from "expo-linear-gradient";
// import { Table, Row, Rows } from 'react-native-table-component';

const Overview = () => {
  const navigation = useNavigation();
  const tableHead = ['Head', 'Head2', 'Head3', 'Head4']
   const tableData = [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]
  // const [rowData, setRowData] = useState([])
  // const [tableData, setTableData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.body}>
        <View>
          <Text style={styles.name}>Welcome, Samy!</Text>
          <Text style={styles.para}>Get a look at the deliveries</Text>
        </View>
        <LinearGradient style={styles.boxDist} colors={["#AE67F9", "#F1966E"]}>
          <Text style={styles.boxDistText}>X Km Distance Travelled</Text>
        </LinearGradient>
        <View style={styles.boxTime}>
          <Text style={styles.boxtTimeText}>x% Delivered Time</Text>
        </View>
        <View style={styles.table}>
          <ScrollView horizontal={true}>
          {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} />
          <Rows data={tableData} />
        </Table> */}
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
