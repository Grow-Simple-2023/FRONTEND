import React from "react";
import { Text, Image, View,TextInput, TouchableOpacity,Keyboard, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import {Colors} from '../ref/colors'
import SplashScreen from "../screens/AuthStack/SplashScreen";



const GradientText = (props: any) => {
    const text = props.text;
    const style = props.style;
    const [fontsLoaded] = useFonts({
      'Rubik': require('../../assets/font/Rubik/static/Rubik-Medium.ttf'),
  });

  if(!fontsLoaded) {
    return <SplashScreen/>
  }

  return (
    <MaskedView maskElement={<Text style={[style,{fontFamily:'Rubik'}]}>{text}</Text>}>
        <LinearGradient 
            start={{x:0,y:0}}
            end={{x:0.6,y:0.8}}
            colors={[Colors.Grad1,Colors.Grad2]}
        >
            <Text style={[style,{opacity: 0,fontFamily:'Rubik'}]}>{text}</Text>
        </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
