import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import SignUp from "./SignUp";
import barcodeIcon from "../assets/barcode.png";
import homeIcon from "../assets/home.png";
import userIcon from "../assets/userIcon.png";
import HomeUserPage from "../components/HomeUserPage";
import bankIcon from "../assets/bankLogo.png";
import Passbook from "./Passbook";
import HomePage from "../components/HomePage";
import TransactionReceipt from "./TransactionReceipt";
import AccountPage from "./AccountPage";
import ProfilePage from "./ProfilePage";
import PassbookPage from "./PassbookPage";
import UserPage from "./UserPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BarcodeStack({navigation}) {
  navigation.setOptions({ tabBarVisible: false })
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
       // options={{ title: "QR Code Scanner", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="TransactionReceipt" component={TransactionReceipt} />
    </Stack.Navigator>
  );
}

function UserSettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserAccountPage"
        component={UserPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomePageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeUserPage"
        component={HomeUserPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ title: "QR Code Scanner", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="TransactionReceipt" component={TransactionReceipt} />
    </Stack.Navigator>
  );
}

export default function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "HomePageStack") {
            icon = homeIcon;
          } else if (route.name === "BarcodeStack") {
            icon = barcodeIcon;
          } else if (route.name === "Login") {
            icon = userIcon;
          } else if (route.name === "Passbook") {
            icon = bankIcon;
          }

          // You can return any component that you like here!
          return <Image source={icon} size={size} color={color}  style = {{
            width : 41,
            height :41,
            tintColor: focused ? "#FF9A7B" : "#F6E0A7",
          }}/>;
        },
      })}
      initialRouteName="HomeUserPage"
      tabBarOptions={{
        activeTintColor: "tomato",
        // inactiveTintColor: "black",
        activeBackgroundColor: "#F6E0A7",
        inactiveBackgroundColor: "#FFFFFF",
        showLabel: false,
        tabStyle: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35, 
          paddingVertical: 3,
        },
        style: {
          elevation: 0,
          backgroundColor: "#fff",
          height: "8%",
          borderTopWidth: 0,
          width: Dimensions.get("screen").width, 
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35, 
          position : "absolute"
        },
      }}
    >
      <Tab.Screen name="HomePageStack" component={HomePageStack} />
      <Tab.Screen name="BarcodeStack" component={BarcodeStack}  />
      <Tab.Screen name="Passbook" component={PassbookPage} />
      <Tab.Screen name="Login" component={UserSettingsStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
});
