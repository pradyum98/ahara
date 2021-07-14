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
import endHunger from "../assets/endHungerIllust.jpeg";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";
import PhoneInput from "react-native-phone-number-input";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function LoginPage({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HomeTabs");
      }
    });

    return unsubscribe;
  }, []);

  const attemptInvisibleVerification = false;

  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mobileNumber, onChangeMobileNumber] = React.useState("");
  const [triggerBool, setTriggerBool] = React.useState("SignUp");
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [confirm, setConfirm] = React.useState(null);
  const recaptchaVerifier = React.useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  return (
    <View style={{ flex: 1, backgroundColor: "#FF6333" }}>
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
            Enter Your
          </Text>
          <Text
            style={{
              color: "#000000",
              fontWeight: "700",
              fontSize: 30,
              letterSpacing: 1,
              color: "#fff",
            }}
          >
            Mobile Number
          </Text>
          <Text
            style={{
              color: "#000000",
              margin: 20,
              fontWeight: "normal",
              fontSize: 17,
              color: "#fff",
            }}
          >
            You will receive a 4 digit code to verify next
          </Text>
          <View style={{ margin: 60 }}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
              attemptInvisibleVerification={attemptInvisibleVerification}
              title="Prove you are human!"
              cancelLabel="Close"
            />
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withoutDarkTheme
              withShadow
              autoFocus
            />
            <TouchableOpacity
              title="Sign Up"
              color="#FF8662"
              style={{
                alignSelf: "center",
                backgroundColor: "#FF8662",
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
                try {
                  console.log(phoneInput, "phoneInput");
                  console.log(value, "value");
                  if (
                    !(await db.collection("users").doc(value.toString()).get())
                      .exists
                  ) {
                    navigation.navigate("SignUp");
                  } else {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId =
                      await phoneProvider.verifyPhoneNumber(
                        "+91" + value,
                        recaptchaVerifier.current
                      );
                    setVerificationId(verificationId);
                    alert("Verification code has been sent to your phone.");
                    navigation.navigate("OTP", { verificationId });
                  }
                } catch (err) {
                  console.log(err);
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
                  Request OTP
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    height: 25,
                    width: 25,
                    borderRadius: 10,
                    backgroundColor: "#FFAC93",
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
