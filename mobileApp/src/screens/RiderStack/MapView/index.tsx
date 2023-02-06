import React, { useLayoutEffect, useEffect, useState, useCallback } from "react";
import Checkbox from 'expo-checkbox';
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
import style from "./style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import OrderItem from "../../../Components/RiderItems";
import HeaderBar from "../../../Components/HeaderBar";
import { Colors } from "../../../ref/colors";
import { apiendpoint } from "../../../constants/apiendpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RiderScreen = (props: any) => {
  const { width } = Dimensions.get("window");
  const [orders, setOrders] = useState([]);
  const [delivering, setDelivering] = useState({});
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const [assign, setassign] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [OTP,setOTP] = useState('');
  const [isDelivered, setDelivered] = useState(false);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const showModalfn = () => {
    setModalVisible(true);
  }

  const submitOTP = async () => {
    console.log('selectcontainer');
    var phoneNO = await AsyncStorage.getItem("userid");
    var jwt = await AsyncStorage.getItem("@jwtauth");
    var OTP_no = Number(OTP);
    if (!jwt) props.navigation.navigate("Login");
    // console.log(jwt);
    // console.log(phoneNO);
    fetch(`${apiendpoint}/rider/route/item-status-update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Credentials: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        item_id: delivering,
        status: ((isDelivered==false)?0:1),
        OTP: OTP_no,
      })
    })
      .then((res: any) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json: any) => {
        console.log(JSON.stringify(json, null, 2));
      })
      .catch(console.log);
  }

  const onRefresh = async () => {
    var phoneNO = await AsyncStorage.getItem("userid");
    var jwt = await AsyncStorage.getItem("@jwtauth");
    if (!jwt) props.navigation.navigate("Login");
    // console.log(jwt);
    // console.log(phoneNO);
    fetch(`${apiendpoint}/rider/route/${phoneNO}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Credentials: `Bearer ${jwt}`
      }
    })
      .then((res: any) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json: any) => {
        console.log(JSON.stringify(json, null, 2));
        if (json.detail) {
          setassign(false);
        }
        setOrders(json.route.items_in_order);
        setDelivering(json.route.items_in_order[0]);
      })
      .catch(console.log);
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();

      return () => {
        setOrders([]);
        setDelivering({});
        setassign(true);
        setModalVisible(false);
        setOTP("");
        setDelivered(false);
      }
    }, [])
  );
  
  const backWithRefresh = () => {
    onRefresh();
  }

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          backgroundColor: Colors.Background,
          height: "100%",
          width: "100%",
          flex: 1,
          position: "absolute"
        }}
      >
        <HeaderBar navigation={props.navigation} />
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: 15.5171,
            longitude: 74.927,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userInterfaceStyle={"dark"}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={
              "AtD6KKbxZbMGumtiusZaHBClfullYMvlqCbIacNNkQQu-ONLx-95xel_a6y45wTH"
            }
          />
        </MapView>
        {/* <BingMapsView
          credentialsKey="AtD6KKbxZbMGumtiusZaHBClfullYMvlqCbIacNNkQQu-ONLx-95xel_a6y45wTH"
          mapLocation={{ lat: 12.9010875, long: 77.6095084, zoom: 15 }}
          // style={styles.box}
        /> */}
      </View>
      <View style={style.modalcenteredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={style.modalcenteredView}>
          <View style={style.modalView}>
            <TouchableOpacity
              style={[style.modalclosebutton]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={style.textStyle}>X</Text>
            </TouchableOpacity>
            <View style={style.fieldView}>
              <View style={style.OTPView}>
                <TextInput
                  style={style.OTPinputStyle}
                  value={OTP}
                  placeholder="Enter OTP here"
                  cursorColor={Colors.Grad2}
                  selectionColor={"red"}
                  placeholderTextColor={Colors.Theme}
                  onChangeText={(username) => setOTP(OTP)}
                />
                <Image
                  source={require("../../../../assets/otp-icon-light.png")}
                  style={{
                    height: 24,
                    width: 24,
                    margin: 10,
                    resizeMode: "stretch",
                    alignItems: "center"
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',paddingVertical: 10}}>
              <Checkbox style={{padding: 10,}}value={isDelivered} onValueChange={setDelivered}/>
              <Text style={style.textStyle}>Item Delivered</Text>
            </View>
            <TouchableOpacity 
              style={[style.modalclosebutton,{alignSelf:'flex-end'}]}
              onPress={() => submitOTP}
            >
              <Text style={style.textStyle}>Submit</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </Modal>
    </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Reorder", { orders, backWithRefresh })}
        style={{
          backgroundColor: Colors.Background,
          padding: 15,
          borderRadius: 15,
          justifyContent:'flex-end',
          flexDirection:'row',
          elevation:10,
        }}
      >
        <Image
          source={require("../../../../assets/reorder-icon.png")}
         />
        <Text style={{ color: Colors.Theme, fontFamily:'Rubik', fontSize:16 , padding: 5, textAlign: "right" }}>Reorder</Text>
      </TouchableOpacity>
      <View>
        {!assign ? (
          <Text style={{ color: "white" }}>Rider is Not Assigned</Text>
        ) : (
          ""
        )}
        <View style={style.orderItems}>
          <ScrollView
            pagingEnabled={true}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={"center"}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30
            }}
          >
            {orders?.map((order, id) => {
              return (
                <OrderItem
                  key={id}
                  transparent={false}
                  name={order.title}
                  delivering={delivering}
                  setDelivering={setDelivering}
                  order={order}
                  showModal={() => showModalfn()}
                  // selectcontainerAction = {() => selectcontainerAction()}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RiderScreen;
