import { StyleSheet } from "react-native";

import { Colors } from "../../../ref/colors";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    color: Colors.Text
  },
});

export default style;
