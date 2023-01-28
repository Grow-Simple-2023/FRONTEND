import { StyleSheet, Dimensions } from "react-native";
import { useFonts } from 'expo-font';

import { Colors } from "../../../ref/colors";

// const [fontsLoaded] = useFonts({
//     'Rubik': require('../../../../assets/fonts/Rubik.otf'),
//   });

const width = 0.8*Dimensions.get('window').width;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    containerView: {
        flex: 1,
        padding: "10%",
        paddingTop: "15%",
    },
    scrollbar: {
        flex:1,
    },
    centerElement: {
        // display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        width: width
    },
    centerIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        paddingTop:"15%",
        color: Colors.Text,
        // position: 'relative',
        // left:10,
        // width:"70%",
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 40,
        letterSpacing: 0.05,
        backgroundColor: 'transparent',
    },
    fieldView: {
        alignItems:'flex-end',
        paddingVertical:"5%",
    },
    usernameView: {
        flexDirection: 'row',
        paddingBottom: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.Theme,
        padding: 12,
        marginBottom: 5,
        width:width,
    },
    usernameinputStyle: {
        flex:1,
        color: Colors.Text,
    },
    passwordView: {
        flexDirection: 'row',
        paddingBottom: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        width: width,
    },
    passwordinputStyle: {
        color: Colors.Text,
        flex:1,
    },
    bottomContainer:{
        flex: 1,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        paddingHorizontal: 50,
        paddingVertical:15,
        backgroundColor: Colors.Accent,
        borderRadius:20,
    },
    buttonElement: {
        color:Colors.Text,
        alignItems:'center',
        justifyContent: 'center',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 40,
    },
    LinkText: {
        paddingVertical:'2%',
        color:Colors.Text,
        alignItems:'center',
        justifyContent: 'center',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        textDecorationLine: 'underline',
        fontWeight: '500',
        fontSize: 25,
    },
});

export default style;
