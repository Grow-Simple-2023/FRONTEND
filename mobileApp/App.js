import { NavigationContainer } from "@react-navigation/native";

import AuthStackScreen from "./src/navigation/AuthStackScreen";

export default function App() {
  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
}
