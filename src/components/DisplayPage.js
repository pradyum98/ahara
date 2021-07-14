import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import logo from "../assets/Logo.png";
import endHunger from "../assets/endHungerIllust.jpeg";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";

export default function DisplayPage({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HomeTabs");
      }
    });

    return unsubscribe;
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          //   justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Image
            source={logo}
            style={{
              width: 40,
              height: 40,
              marginTop: 51,
              marginHorizontal: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Text
            style={{
              marginHorizontal: 4,
              marginTop: 51,
              color: "#000000",
              fontWeight: "400",
              fontSize: 30,
            }}
          >
            Ahara
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            margin: 20,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontWeight: "700",
              fontSize: 30,
              letterSpacing: 1,
            }}
          >
            Food for Affirming
          </Text>
          <Text
            style={{
              color: "#000000",
              fontWeight: "700",
              fontSize: 30,
              letterSpacing: 1,
            }}
          >
            Life
          </Text>
          <Text
            style={{
              color: "#000000",
              margin: 20,
              fontWeight: "normal",
              fontSize: 17,
            }}
          >
            Join our community and put sustenance first
          </Text>
          <Image
            source={endHunger}
            style={{
              width: Dimensions.get("screen").height * 0.4,
              height: Dimensions.get("screen").height * 0.4,
              borderRadius: 80,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FB774F",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Button
          style={{
            height: Dimensions.get("screen").height * 0.06,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          color="#FB774F"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#fff" }}> Sign In</Text>
        </Button>
        <Button
          style={{
            height: Dimensions.get("screen").height * 0.06,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          color="#FFEFC5"
          mode="contained"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: "#FB774F" }}> Sign Up</Text>
        </Button>
      </View>
    </View>
  );
}
