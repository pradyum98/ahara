import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import userAccountsBackground from "../assets/UserUpperBackground.png";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function ProfilePage() {
  return (
    <ImageBackground
      source={userAccountsBackground}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            margin: 50,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            User Settings
          </Text>
          <View
            style={{ flexDirection: "row", alignContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 26,
                //fontWeight: "bold",
                margin: 40,
              }}
            >
              Profile
            </Text>
            <View style={{ margin: 40 }}>
              <Fontisto name="check" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.transactionContainer}>
         <Text style = {{fontSize : 18, marginLeft : 20}}>
             Photo
         </Text>
         <View style={{flexDirection : "column" , alignItems : "center",marginRight : 40}}>
         <View
            style={{
              width: Dimensions.get("window").width * 0.16,
              height: Dimensions.get("window").width * 0.16,
              backgroundColor: "#C4C4C4",
              marginHorizontal: 10,
              borderRadius: Dimensions.get("window").width * 0.16,
            }}
          />
           <Text style = {{fontSize : 18, marginLeft : 20, margin : 10}}>
             Upload Image
         </Text>
         </View>
        </View>
        <View style={styles.transactionContainer}>
            <Text style={{
                fontSize: 18,
                //fontWeight: "bold",
                margin: 20,
              }}>Name</Text>
         <TextInput
            style={styles.input}
            // placeholder="Enter Mobile Number"
            theme={{ colors: { primary: '#EBCB7A',underlineColor:'transparent',}}}
          />
        </View>
        <View style={styles.transactionContainer}>
            <Text style={{
                fontSize: 18,
                //fontWeight: "bold",
                margin: 20,
              }}>Vendor Name</Text>
         <TextInput
            style={styles.input}
            // placeholder="Enter Mobile Number"
            theme={{ colors: { primary: '#EBCB7A',underlineColor:'transparent',}}}
          />
        </View>
        <View style={styles.transactionContainer}>
            <Text style={{
                fontSize: 18,
                //fontWeight: "bold",
                margin: 20,
              }}>Age</Text>
         <TextInput
            style={styles.input}
            // placeholder="Enter Mobile Number"
            theme={{ colors: { primary: '#EBCB7A',underlineColor:'transparent',}}}
          />
        </View>
        {/* <View style={styles.transactionContainer}>
            <Text style={{
                fontSize: 18,
                //fontWeight: "bold",
                margin: 20,
              }}>Vendor Name</Text>
         <TextInput
            label="Mobile Number"
            style={styles.input}
            placeholder="Enter Mobile Number"
            theme={{ colors: { primary: '#EBCB7A',underlineColor:'transparent',}}}
          />
        </View> */}
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
  },
  receiptContainer: {
    margin: 20,
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.5,
    borderRadius: 20,
    backgroundColor: "#DDDCDC",
  },
  transactionContainer: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent : "space-between"
  },
  input: {
    height: Dimensions.get("screen").height * 0.07,
    width: Dimensions.get("screen").width * 0.6,
    backgroundColor: '#fff'
  },
});
