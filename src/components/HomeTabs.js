import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import barcodeIcon from "../assets/barcodeIcon.png";
import homeIcon from "../assets/Home_icon.png";
import userIcon from "../assets/userIcon.png";

const Tab = createBottomTabNavigator();


export default function HomeTabs() {
    return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let icon;
    
                if (route.name === "HomePage") {
                  icon = barcodeIcon;
                } else if (route.name === "SignUp") {
                  icon = homeIcon;
                } else if (route.name === "Login") {
                  icon = userIcon;
                }
    
                // You can return any component that you like here!
                return <Image source={icon} size={size} color={color} />;
              },
            })}
            initialRouteName="HomePage"
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="HomePage" component={HomePage} />
            <Tab.Screen name="SignUp" component={SignUp} />
            <Tab.Screen name="Login" component={LoginScreen} />
          </Tab.Navigator>
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
    