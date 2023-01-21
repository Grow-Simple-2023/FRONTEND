import React from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import style from "./style";

const SplashScreen = (props) => {
  const fontsLoaded = true;
  const [splashLoaded, setSplash] = React.useState(false);
  const [apiLoaded, setApiLoading] = React.useState(false);
  const [route, setRoute] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      // Check if the user is Authenticated.
      // If he is, then take him to the screen he is supposed to see.
      // Otherwise, take him to Login
      setRoute("AdminTabs");
      setApiLoading(true);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setSplash(true);
      }, 2500);
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
    <SafeAreaView style={style.centerIcon}>
      <Text style={style.textColor}>SplashScreen</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
