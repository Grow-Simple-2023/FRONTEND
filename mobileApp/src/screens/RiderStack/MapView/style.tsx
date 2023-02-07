import { StyleSheet, Dimensions } from "react-native";

import { Colors } from "../../../ref/colors";

const TrackItemNotchElementSpace = 10;

const width = 0.8*Dimensions.get('window').width;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
        /* justifyContent: "flex-end", */
        alignItems:'center',
    },
    scrollviewstyle: {
        paddingTop:TrackItemNotchElementSpace,
        backgroundColor: Colors.Background,
        /* justifyContent: "flex-end", */
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius: 10
    },
    separatornotch: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        maxHeight: 15,
        width: 100,
        backgroundColor: Colors.Accent,
        borderRadius: 150,
        flexDirection: "row",
    },
    orderItems: {
        marginTop: TrackItemNotchElementSpace,
        flexDirection: "row",
        /* backgroundColor: Colors.Background, */
        justifyContent: "center",
        alignItems:'center',
    },
    ordStatus: {
        paddingVertical: 5
    },
    modalcenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: Colors.Background,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        elevation: 10,
    },
    modalclosebutton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors.Accent,
    },
    textStyle: {
        paddingHorizontal:'5%',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fieldView: {
        alignItems:'flex-end',
        paddingVertical:"5%",
    },
    OTPView: {
        flexDirection: 'row',
        paddingBottom: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.Theme,
        padding: 12,
        marginBottom: 5,
        width:width,
    },
    OTPinputStyle: {
        flex:1,
        color: Colors.Theme,
    },
});

export default style;
