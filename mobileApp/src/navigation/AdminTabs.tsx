import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Overview from "../screens/AdminTabs/Overview";
import orders from "../screens/AdminTabs/Orders";

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Orders" component={orders} />
    </Tab.Navigator>
  );
};

export default AdminTabs;
