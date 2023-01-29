import React from "react";
import { Text, Image, View,TextInput, TouchableOpacity,Keyboard, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "./style";
import { Colors } from "../../../ref/colors";
import SplashScreen from "../SplashScreen";
import GradientText from '../../../Components/GradientText';


const Login = (props) => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {}
  return (
    <SafeAreaView style={style.container}>
          <KeyboardAvoidingView style={style.containerView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView style={style.scrollbar}>
              <View style={[style.centerElement]}>
                <Image
                  style={style.centerIcon}
                  source={require('../../../../assets/home_map.png')}
                />
              </View>
              <GradientText text={'WELCOME\nBACK!'} style={style.welcomeText}/>
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
                <TouchableOpacity>
                  <Text style={[style.LinkText,{position:'relative',right:0,fontSize:15,color:Colors.Theme,fontWeight:'bold'}]}>Forgot Password?</Text> 
                </TouchableOpacity>
              </View>
              <View style={style.bottomContainer}>
                  <TouchableOpacity onPress={()=>{props.navigation.navigate('SignUp')}}>
                    <Text style={style.LinkText}>SignUp</Text> 
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
          </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
