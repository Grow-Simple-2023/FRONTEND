import React from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "./style";
import { Colors } from "../../../ref/colors";
import SplashScreen from "../SplashScreen";
import GradientText from "../../../Components/GradientText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiendpoint } from "../../../constants/apiendpoint";

const Login = (props: any) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [viewpass,setview] = React.useState(true);

  const handleSubmit = async () => {
    // var jwt = await AsyncStorage.getItem("@jwtauth");
    // if (!jwt) jwt = "";
    fetch(`${apiendpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        phone_no: username,
        password: password
      })
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        //console.log(JSON.stringify(json, null, 2));
        console.log(username);
        const saveData = async () => {
          await AsyncStorage.setItem("@jwtauth", json.token.access_token);
          await AsyncStorage.setItem("userid", String(username));
        };
        saveData();
        setTimeout(() => {
          if (json.role === "ADMIN") props.navigation.navigate("AdminTabs");
          else if (json.role === "RIDER") props.navigation.navigate("Rider");
        },2000);
      })
      .catch(console.log);
  };

  return (
    <SafeAreaView style={style.container}>
      {/* <KeyboardAvoidingView style={style.containerView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
      <ScrollView style={style.containerView}>
        <View style={[style.centerElement]}>
          <Image
            style={style.centerIcon}
            source={require("../../../../assets/home_map.png")}
          />
        </View>
        <GradientText text={"WELCOME\nBACK!"} style={style.welcomeText} />
        <View style={style.fieldView}>
          <View style={style.usernameView}>
            <TextInput
              style={style.usernameinputStyle}
              value={username}
              placeholder="SamyC2002"
              cursorColor={Colors.Grad2}
              selectionColor={"red"}
              placeholderTextColor={Colors.Theme}
              onChangeText={(username) => setUsername(username)}
            />
            <Image
              source={require("../../../../assets/user.png")}
              style={{
                margin: 10,
                resizeMode: "stretch",
                alignItems: "center"
              }}
            />
          </View>
          <View style={style.passwordView}>
            <TextInput
              secureTextEntry={viewpass}
              style={style.passwordinputStyle}
              value={password}
              placeholder="Password"
              cursorColor={Colors.Grad2}
              selectionColor={"red"}
              placeholderTextColor={Colors.Text}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity
              onPress={()=>{
                setview(!viewpass);
              }}>
              <Image
                source={require("../../../../assets/vieweye-light.png")}
                style={{
                  margin: 10,
                  resizeMode: "stretch",
                  alignItems: "center"
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            {/* <Text
              style={[
                style.LinkText,
                {
                  position: "relative",
                  right: 0,
                  fontSize: 15,
                  color: Colors.Theme,
                  fontWeight: "bold"
                }
              ]}
            >
              Forgot Password?
            </Text> */}
          </TouchableOpacity>
        </View>
        <View style={style.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SignUp");
            }}
          >
            <Text style={style.LinkText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={style.buttonContainer}
          >
            <View>
              <Image
                style={style.buttonElement}
                source={require("../../../../assets/Arrow.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default Login;
