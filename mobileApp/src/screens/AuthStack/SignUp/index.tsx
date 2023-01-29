import React from "react";
import { Text, Image, View,TextInput, TouchableOpacity,Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "./style";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "../../../ref/colors";
import { useFonts } from 'expo-font';
import SplashScreen from "../SplashScreen";
import GradientText from '../../../Components/GradientText';


const SignUp = (props) => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [fontsLoaded] = useFonts({
    'Rubik': require('../../../../assets/font/Rubik/static/Rubik-Medium.ttf'),
});

  if(!fontsLoaded){
    return <SplashScreen/>;
  }

  const handleSubmit = () => {}
  return (
    <SafeAreaView style={style.container}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{flex: 1,}}> */}
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <ScrollView style={style.containerView}>
              <View style={[style.centerElement]}>
                <Image
                  style={style.centerIcon}
                  source={require('../../../../assets/home_map.png')}
                />
              </View>
              <GradientText text={'WELCOME\n'} style={style.welcomeText}/>
              <View style={style.fieldView}>
                <View style={style.usernameView}>
                  <TextInput
                    style={style.usernameinputStyle}
                    value={username}
                    placeholder="SamyC2002"
                    cursorColor={Colors.Grad2}
                    selectionColor={'red'}
                    placeholderTextColor={Colors.Theme}
                    onChangeText={username => setUsername(username)}
                  />
                  <Image
                    source={require('../../../../assets/user.png')}
                    style={{
                      margin: 5,
                      resizeMode: 'stretch',
                      alignItems: 'center',
                    }}
                  />
                </View>
                <View style={style.passwordView}>
                  <TextInput
                    style={style.passwordinputStyle}
                    value={password}
                    placeholder="Password"
                    cursorColor={Colors.Grad2}
                    selectionColor={'red'}
                    placeholderTextColor={Colors.Text}
                    onChangeText={password => setPassword(password)}
                  />
                  <Image
                    source={require('../../../../assets/password.png')}
                    style={{
                      margin: 5,
                      resizeMode: 'stretch',
                      alignItems: 'center',
                    }}
                  />
                </View>
              </View>
              <View style={style.bottomContainer}>
                  <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                    <Text style={style.LinkText}>Login</Text> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSubmit()} style={style.buttonContainer}>
                      <View>
                        <Image
                          style={style.buttonElement}
                          source={require('../../../../assets/Arrow.png')}
                        />
                      </View> 
                  </TouchableOpacity>
              </View>
          </ScrollView>
          {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default SignUp;
