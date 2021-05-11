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

const Stack = createStackNavigator();

export default function App() {
  return (
    console.log("hi");
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' }
        }}
        initialRouteName="HomePage"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // options = {{title : "Login Screen"}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
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
