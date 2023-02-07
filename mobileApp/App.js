import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackScreen from "./src/navigation/AuthStackScreen";
import { Colors } from "./src/ref/colors";

export default function App() {

  React.useEffect(() => {
    StatusBar.setBarStyle("default", true);
    StatusBar.setBackgroundColor(Colors.Background);
  }, []);

  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
}
