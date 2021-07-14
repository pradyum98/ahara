import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import "@react-native-firebase/app";
import firebase from "firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { Button } from "react-native-paper";
import logo from "../assets/Logo.png";
import otpImage from "../assets/abcd.webp";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";
import PhoneInput from "react-native-phone-number-input";
import { SimpleLineIcons } from "@expo/vector-icons";
import OTPTextInput from "react-native-otp-textinput";

export default function OTPPage({ route ,navigation}) {
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HomeTabs");
      }
    });

    return unsubscribe;
  }, []);
  const {
    verificationId
  } =  route.params;
  console.log(verificationId,"verificationId");
  const attemptInvisibleVerification = false;

  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mobileNumber, onChangeMobileNumber] = React.useState("");
  const [triggerBool, setTriggerBool] = React.useState("SignUp");
  const [verificationCode, setVerificationCode] = React.useState();
  const [confirm, setConfirm] = React.useState(null);
  const recaptchaVerifier = React.useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  return (
    <View style={{ flex: 1, backgroundColor: "#FF8F6C" }}>
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
              width: 48,
              height: 45,
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
              color: "#fff",
            }}
          >
            Ahara
          </Text>
        </View>
        <View style={{}}>
          <Image
            source={otpImage}
            style={{
              width: Dimensions.get("screen").height * 0.27,
              height: Dimensions.get("screen").height * 0.27,
              marginTop: 21,
              marginHorizontal: 4,
              borderRadius: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
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
              color: "#fff",
            }}
          >
            Verification Code
          </Text>

          <Text
            style={{
              color: "#000000",
              marginHorizontal: 20,
              marginTop: 20,
              fontWeight: "normal",
              fontSize: 17,
              color: "#fff",
            }}
          >
            We have sent the verification code
          </Text>
          <Text
            style={{
              color: "#000000",
              fontWeight: "normal",
              fontSize: 17,
              color: "#fff",
            }}
          >
            to your mobile number
          </Text>
          <View style={{ margin: 40 }}>
            <OTPTextInput
              ref={setVerificationCode}
              handleTextChange={setVerificationCode}
              containerStyle={styles.textInputContainer}
              textInputStyle={styles.roundedTextInput}
              inputCount={6}
              tintColor="#F0CF79"
              offTintColor="#FFEFC5"
            />
            <TouchableOpacity
              title="Sign Up"
              color="#FFAD94"
              style={{
                alignSelf: "center",
                backgroundColor: "#FFAD94",
                padding: 10,
                paddingHorizontal: 40,
                paddingHorizontal: 20,
                width: "100%",
                margin: 40,
                color: "#ffffff",
                borderRadius: 29,
                elevation: 0,
                alignContent: "center",
              }}
              onPress={async () => {
                  console.log(verificationCode,"verificationCode")
                try {
                  const credential =
                    firebase.auth.PhoneAuthProvider.credential(
                      verificationId,
                      verificationCode
                    );
                  await firebase.auth().signInWithCredential(credential);
                  alert("Phone authentication successful 👍");
                  navigation.navigate("HomeTabs");
                } catch (err) {
                  alert(`${err.message}`);
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  Submit OTP
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    height: 25,
                    width: 25,
                    borderRadius: 10,
                    backgroundColor: "#FF7E56",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SimpleLineIcons name="arrow-right" size={15} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
    color: "#fff",
    fontWeight: "bold",
  },
});
