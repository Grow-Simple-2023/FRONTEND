import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Overview from "../screens/AdminTabs/Overview";
import orders from "../screens/AdminTabs/Orders";
import { Colors } from "../ref/colors";
import {
  ClipboardDocumentListIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: (({ focused, color, size })=>{
        if (route.name == "Location"){
          return <MapPinIcon color={`${focused ? Colors.Theme : Colors.Text }`} size={22} />
        }else{
          return <ClipboardDocumentListIcon color={`${focused ? Colors.Theme : Colors.Text }`} size={22} />
        }
        
      }) ,
      tabBarStyle: {backgroundColor: Colors.Background, borderTopColor: "black",},
      tabBarActiveTintColor: Colors.Theme,
      tabBarInactiveTintColor: Colors.Text,

    })}>
      
      <Tab.Screen name="Location" component={Overview} />
      <Tab.Screen name="Orders" component={orders} />
    </Tab.Navigator>
  );
};

export default AdminTabs;
