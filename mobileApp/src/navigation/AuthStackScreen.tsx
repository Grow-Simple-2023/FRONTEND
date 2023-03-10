import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/AuthStack/SplashScreen";
import Login from "../screens/AuthStack/Login";
import SignUp from "../screens/AuthStack/SignUp";
import RiderScreen from "../screens/RiderStack/MapView";
import ReorderScreen from "../screens/RiderStack/ReorderView";
import AdminTabs from "./AdminTabs";

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SplashScreen">
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Rider"
        component={RiderScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Reorder"
        component={ReorderScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="AdminTabs"
        component={AdminTabs}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
