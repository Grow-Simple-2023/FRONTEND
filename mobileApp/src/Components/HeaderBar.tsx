import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../ref/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderBar = (props: any) => {

  const logout = async () => {
    await AsyncStorage.removeItem("@jwtauth");
    await AsyncStorage.removeItem("userid");
    props.navigation.navigate("Login");
  };
  return (
    <TouchableOpacity 
      style = {styles.container}
      onPress = { () => {
          logout();
        }}>
        <Image
          style={styles.profImg}
          source={{ uri: "https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg" }}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
        height:60,
        // backgroundColor: "gray",
        color: Colors.Text,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "center",
        
      },
      textColor : {
        color: Colors.Text
      },
      profImg : {
        width: 45,
        height: 45,
        borderRadius: 100,
        borderColor: Colors.Accent,
        borderWidth: 1.5,
      }
})

export default HeaderBar