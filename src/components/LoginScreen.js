import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";

import "@react-native-firebase/app";
import firebase from "firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import ellipse from "../assets/Ellipse9.png";
import logo from "../assets/Logo.png";
import Card from "./Card";
import foodImage from "../assets/Group6.png";

// Initialize Firebase
//TODO: Shift to a different file and initialize in App.js
const firebaseConfig = {
  apiKey: "AIzaSyCQomOAxL0oRH7vYpuCXwhrQ1fWRzO2qW0",
  authDomain: "ahara-b0403.firebaseapp.com",
  databaseURL: "https://ahara-b0403.firebaseio.com",
  projectId: "ahara-b0403",
  storageBucket: "ahara-b0403.appspot.com",
  messagingSenderId: "601848970227",
  appId: "1:601848970227:android:5b8e86e781a92be929f086",
  //   measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

export default function LoginScreen({ navigation }) {
  const [mobileNumber, onChangeMobileNumber] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [triggerBool, setTriggerBool] = React.useState("SignUp");
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [confirm, setConfirm] = React.useState(null);
  const recaptchaVerifier = React.useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  const triggerSignUpLogin = () => {
    if (triggerBool == "LogIn") {
      setTriggerBool("SignUp");
    } else {
      setTriggerBool("LogIn");
    }
  };

  const attemptInvisibleVerification = false;

  return (
    <ImageBackground
      source={foodImage}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={logo}
          style={{
            position: "absolute",
            width: 67,
            height: 63,
            top: 51,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: 120,        
            color: "#000000",
            fontWeight : "bold",
            fontSize: 30
          }}
        >
          Welcome To Ahara!
        </Text>
      </View>

      <Text style={styles.container}></Text>

      {triggerBool == "LogIn" && (
        <View style={styles.container}>
          <Text>Log In Screen</Text>
          <TextInput
            label="Mobile Number"
            style={styles.input}
            onChangeText={onChangeMobileNumber}
            value={mobileNumber}
            placeholder="Enter Mobile Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            textContentType={password}
            placeholder="Enter Password"
          />
          <Button color="#f07049" title="Log In" onPress={() => {}} />
        </View>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              title="Sign Up"
              style={[styles.buttonv2 , {marginRight : 10}]}
              onPress={triggerSignUpLogin}
              disabled={triggerBool == "SignUp"}
            >
              <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Log In"
              style={styles.buttonv2}
              color="#f07049"
              onPress={() => {}}
              disabled={triggerBool == "LogIn"}
            >
              <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
          </View>
          {triggerBool == "SignUp" && (
            <View style={styles.container}>
              <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
              />
              <TextInput
                label="Mobile Number"
                style={styles.input}
                onChangeText={onChangeMobileNumber}
                value={mobileNumber}
                theme={{ colors: { primary: "#F07049" } }}
              />
              {!verificationId && (
                <View>
                  {/* <Text> x</Text> */}
                  <TouchableOpacity
                    title="Submit"
                    color="#f07049"
                    style={styles.button}
                    onPress={async () => {
                      try {
                        const phoneProvider = new firebase.auth.PhoneAuthProvider();
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                          mobileNumber,
                          recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        alert("Verification code has been sent to your phone.");
                      } catch (err) {
                        console.log(err);
                        alert(`${err.message}`);
                      }
                    }}
                  >
                    <Text style={styles.text}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
              {verificationId && (
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    textContentType={password}
                    label="OTP"
                    theme={{ colors: { primary: "#F07049" } }}
                  />
                  <TouchableOpacity
                    title="Sign Up"
                    color="#f07049"
                    style={styles.button}
                    onPress={async () => {
                      try {
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                          verificationId,
                          password
                        );
                        await firebase.auth().signInWithCredential(credential);
                        alert("Phone authentication successful 👍");
                        navigation.navigate("HomeTabs");
                      } catch (err) {
                        alert(`${err.message}`);
                      }
                    }}
                  >
                    <Text style={styles.text}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    height: Dimensions.get("screen").height * 0.07,
    margin: 30,
    width: Dimensions.get("screen").width * 0.6,
  },
  text: {
    color: "#fff",
    // alignSelf : "center",
    // justifyContent: "center",
    textAlign : "center" 
  },
  textv2: {
    alignItems: "flex-start",
  },
  inputContainer: {
    width: Dimensions.get("window").width * 1,
     marginTop: 220,
    // position: "absolute",
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    
    shadowColor: "black",
     shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
   // flex: 1,
    flexDirection: "row",
    //padding: 30,
    //height : "40%",
    justifyContent: "space-around",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#f07049",
    padding: 10,
    paddingHorizontal: 20,
    width: "100%",
    color: "#ffffff",
    borderRadius: 29,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonv2: {
    backgroundColor: "#f07049",
    padding: 10,
    width: "50%",
    // height: 30,
    color: "#ffffff",
    borderRadius: 29,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
