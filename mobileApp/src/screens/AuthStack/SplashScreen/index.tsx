import React from "react";
import { View, Text, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import style from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiendpoint } from "../../../constants/apiendpoint";

const SplashScreen = (props: any) => {
  const fontsLoaded = true;
  const [splashLoaded, setSplash] = React.useState(false);
  const [apiLoaded, setApiLoading] = React.useState(false);
  const [route, setRoute] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      // Check if the user is Authenticated.
      // If he is, then take him to the screen he is supposed to see.
      // Otherwise, take him to Login
      const getJWT = async () => {
        var jwt = await AsyncStorage.getItem("@jwtauth");
        if (!jwt) jwt = "";
        /* console.log(jwt); */
        if (!jwt) {
          setRoute("Login");
          setApiLoading(true);
        } else
          fetch(`${apiendpoint}/decode-token`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Credentials: `Bearer ${jwt}`
            }
          })
            .then((res) => {
              console.log(res.status);
              if (res.ok) return res.json();
              else throw new Error("Unauthorized");
            })
            .then((json) => {
              if (json.role === "ADMIN") setRoute("AdminTabs");
              else if (json.role === "RIDER") setRoute("Rider");
              setApiLoading(true);
            })
            .catch((err) => {
              console.log(err);
              setRoute("Login");
              setApiLoading(true);
            });
      };
      getJWT();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setSplash(true);
      }, 5000);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (apiLoaded && fontsLoaded && route !== "" && splashLoaded) {
        props.navigation.navigate(route);
      }
    }, [apiLoaded, fontsLoaded, route, splashLoaded])
  );

  return (
    <SafeAreaView style={style.container}>
      <Image
        style={style.centerIcon}
        source={require("../../../../assets/home_map.png")}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
