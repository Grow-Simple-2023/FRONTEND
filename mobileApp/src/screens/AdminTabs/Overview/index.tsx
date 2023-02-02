import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Overview = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('Samy');
  const [percentage, setPerc] = useState(0);

  const [json, setjson] = useState([]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    handleSubmit()
  }, []);

  const handleSubmit = async () => {
    var jwt = await AsyncStorage.getItem("@jwtauth");
    var user = await AsyncStorage.getItem("userid");
    if (!user) user = "Samy";
    if (!jwt) jwt = "";
    console.log(jwt);
    console.log(user);
    setUsername(user);
    fetch(`${apiendpoint}/manager/OTD-percentage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Credentials": `Bearer ${jwt}`
      },
    }).then(res => {
      console.log(res.status);
      if (res.ok == true) return res.json();
      else throw new Error("Unauthorized");
    }).then(json => {
      setPerc(json.percentage);
      // const saveData = async () => {
      //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
      //   await AsyncStorage.setItem("@role", json.user.role);
      // }
      //saveData();
    }).catch(console.log);

    fetch(`${apiendpoint}/manager/unassigned-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Credentials": `Bearer ${jwt}`
      },
    }).then(res => {
      console.log(res.status);
      if (res.ok == true) return res.json();
      else throw new Error("Unauthorized");
    }).then(json => {
      setjson(json.unassigned_items);
      // setItem(json.item.title);
      // setAddress(json.item.address);
      // setEdd(json.item.EDD);
      // setRider(json.item.phone_number);
      // const saveData = async () => {
      //   await AsyncStorage.setItem("@jwtauth", json.auth.access_token);
      //   await AsyncStorage.setItem("@role", json.user.role);
      // }
      //saveData();
    }).catch(console.log);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.body}>
        <View>
          <Text style={styles.name}>Welcome, {username}!</Text>
          <Text style={styles.para}>Get a look at the deliveries</Text>
        </View>
        <LinearGradient style={styles.boxDist} colors={["#AE67F9", "#F1966E"]}>
          <Text style={styles.boxDistText}>X Km Distance Travelled</Text>
        </LinearGradient>
        <View style={styles.boxTime}>
          <Text style={styles.boxtTimeText}>{percentage}% Delivered on Time</Text>
        </View>
      </View>
      <View style={styles.table}>
          <ScrollView horizontal={true}>
            <AdminTable data={json}/> 
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  textColor: {
    color: Colors.Text,
  },
  body: {
    paddingTop: 25,
    paddingLeft: 40,
    paddingRight: 40,
  },
  boxDist: {
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  boxDistText: {
    color: Colors.Text,
    fontSize: 30,
  },
  boxTime: {
    marginTop: 15,
    width: "100%",
    borderWidth: 2,
    borderColor: "#AE67F9",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  boxtTimeText: {
    color: Colors.Text,
    fontSize: 30,
  },
  namePara: {
    color: Colors.Text,
  },
  name: {
    fontSize: 25,
    color: Colors.Text,
    fontWeight: "bold",
    // fontFamily: "rubik"
  },
  para: {
    marginTop: 15,
    color: Colors.Text,
    fontSize: 20,
  },
  table: {
    flex:1,
    justifyContent: "center",
    alignItems:'center',
    marginTop: 15,
  },
});

export default Overview;
