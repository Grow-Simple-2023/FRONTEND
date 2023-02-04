import { StyleSheet } from "react-native";

import { Colors } from "../../../ref/colors";

const TrackItemNotchElementSpace = 10;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "flex-end",
        alignItems:'center',
    },
    scrollviewstyle: {
        paddingTop:TrackItemNotchElementSpace,
        backgroundColor: Colors.Background,
        justifyContent: "flex-end",
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
});

export default style;
