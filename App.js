import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/components/LoginScreen";
import SignUp from "./src/components/SignUp";
import HomeTabs from "./src/components/HomeTabs";
import Passbook from "./src/components/Passbook";
import TransactionReceipt from "./src/components/TransactionReceipt";
import HomePage from "./src/components/HomePage";
import DisplayPage from "./src/components/DisplayPage";
import LoginPage from "./src/components/LoginPage";
import OTPPage from "./src/components/OTPPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' }
        }}
        initialRouteName="DisplayPage"
      >
        <Stack.Screen
          name="DisplayPage"
          component={DisplayPage}
          // options = {{title : "Login Screen"}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          // options = {{title : "Login Screen"}}
        />
         <Stack.Screen
          name="OTP"
          component={OTPPage}
          // options = {{title : "Login Screen"}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options = {{title : "Login Screen"}}
        />
         <Stack.Screen
          name="Passbook"
          component={Passbook}
          // options = {{title : "Login Screen"}}
        />
         <Stack.Screen
          name="TransactionRecipt"
          component={TransactionReceipt}
          // options = {{title : "Login Screen"}}
        />
         <Stack.Screen
          name="HomePage"
          component={HomePage}
          // options = {{title : "Login Screen"}}
        />
         <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          // options = {{title : "Login Screen"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
