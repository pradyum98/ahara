import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "firebase";
import "firebase/firestore";
import foodImage from "../assets/Group6.png";
import logo from "../assets/Logo.png";
import axios from "axios";
import { SimpleLineIcons } from "@expo/vector-icons";

const db = firebase.firestore();

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [upiId, setUpiId] = React.useState("");
  const addContactAndFundAccountDetails = async () => {
    let contactAccountId;
    let fundAccountId;
    try {
      let contactResponse = await axios.post(
        "https://api.razorpay.com/v1/contacts",
        {
          name: firstName + " " + lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic cnpwX3Rlc3RfZnJSRjhxYzJadWcybnY6NkFSYnd6VHVIb3drTnJrdWpZWE84cUR3",
          },
        }
      );
      contactAccountId = contactResponse.data.id;
    } catch (err) {
      console.log("error in contact creation", err);
    }
    try {
      let fundResponse = await axios.post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          account_type: "vpa",
          contact_id: contactAccountId,
          vpa: {
            address: upiId,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic cnpwX3Rlc3RfZnJSRjhxYzJadWcybnY6NkFSYnd6VHVIb3drTnJrdWpZWE84cUR3",
          },
        }
      );
      console.log(fundResponse.data);
      fundAccountId = fundResponse.data.id;
    } catch (err) {
      console.log("error in fund account creation", err);
    }
    alert("Contact and Fund Account Created");
    return {
      contactAccountId,
      fundAccountId,
    };
  };

  return (
    <View
      style={{
        backgroundColor: "#FFEFC5",
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text
              style={{
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              Create Account,
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontWeight: "700",
                color: "#A7A7A7",
                marginBottom: 20,
              }}
            >
              Sign up to get started
            </Text>
          </View>

          <Image
            source={logo}
            style={{
              marginHorizontal: 10,
              width: 67,
              height: 63,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View>
          <Text style={{ margin: 5, fontWeight: "bold", fontSize: 20 }}>
            First Name
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Enter First Name"
            theme={{
              colors: { primary: "#FFEFC5" },
            }}
            underlineColor="transparent" 
          />
        </View>
        <View>
          <Text style={{ margin: 5, fontWeight: "bold", fontSize: 20 }}>
            Last Name
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Enter Last Name"
            theme={{ colors: { primary: "#FFEFC5" } }}
            underlineColor="transparent" 
          />
        </View>
        <View>
          <Text style={{ margin: 5, fontWeight: "bold", fontSize: 20 }}>
            Mobile Number
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setMobileNumber}
            value={mobileNumber}
            placeholder="Enter Mobile Number"
            theme={{ colors: { primary: "#FFEFC5" } }}
            underlineColor="transparent" 
          />
        </View>
        <View>
          <Text style={{ margin: 5, fontWeight: "bold", fontSize: 20 }}>
            UPI ID
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setUpiId}
            value={upiId}
            placeholder="Enter UPI ID"
            theme={{ colors: { primary: "#FFEFC5" } }}
            underlineColor="FFEFC5" 
          />
        </View>

        {/* <Button
        title="Sign Up"
        onPress={async () => {
            await db.collection("users").doc(mobileNumber).set({
              firstName : firstName,
              lastName : lastName,
              mobileNumber : mobileNumber,
              createdAt :  new Date(),
              updatedAt :  new Date(),
              grossWeeklyAmount : 0,
              grossMonthlyAmount : 0,
              grossDailyAmount : 0,
            });
            alert("User data added!");
            navigation.navigate('Login');
          
        }}
      /> */}
        {/* <TouchableOpacity
          title="Sign Up"
          color="#f07049"
          style={styles.button}
          onPress={async () => {
            const { contactAccountId, fundAccountId } =
              await addContactAndFundAccountDetails();
            await db.collection("users").doc(mobileNumber).set({
              firstName: firstName,
              lastName: lastName,
              mobileNumber: mobileNumber,
              createdAt: new Date(),
              updatedAt: new Date(),
              grossWeeklyAmount: 0,
              grossMonthlyAmount: 0,
              grossDailyAmount: 0,
              upiId: upiId,
              contactAccountId: contactAccountId,
              fundAccountId: fundAccountId,
            });
            alert("User data added!");
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.text}>Add Bank Details</Text>
        </TouchableOpacity> */}
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
                //   console.log(verificationCode,"verificationCode")
                // try {
                //   const credential =
                //     firebase.auth.PhoneAuthProvider.credential(
                //       verificationId,
                //       verificationCode
                //     );
                //   await firebase.auth().signInWithCredential(credential);
                //   alert("Phone authentication successful 👍");
                //   navigation.navigate("HomeTabs");
                // } catch (err) {
                //   alert(`${err.message}`);
                // }
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
                  Submit Details
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
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    margin: 110,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    margin: 5,
    height: Dimensions.get("screen").height * 0.07,
    width: Dimensions.get("screen").width * 0.6,
    backgroundColor: "#FFE49D",
    borderBottomRightRadius : 30,
    borderBottomLeftRadius : 30,
    borderTopRightRadius : 30,
    borderTopLeftRadius : 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#f07049",
    padding: 10,
    paddingHorizontal: 20,
    borderColor: "#fff",
    borderWidth: 4,
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
});
