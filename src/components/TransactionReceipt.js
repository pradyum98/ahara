import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import transactionReceipt from "../assets/TransactionReceipt.png";
import greenCheck from "../assets/greenCheck.png";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";

export default function TransactionReceipt({route,navigation}) {
  const [vendorName,setVendorName] = React.useState("");
  React.useEffect(() => {
    function getUserData() {
      let userId = auth.currentUser.phoneNumber.toString().split("+91")[1];
      db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          console.log(data);
          let data = doc.data();
          setVendorName(data.vendorName);
          
        });
    }
    getUserData();
  }, [db]);
  const {
    couponName,
    couponValue
  } =  route.params;
  return (
    <ImageBackground
      source={transactionReceipt}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            margin: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            Transaction Receipt
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            + Rs.{couponValue}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
           {couponName}
          </Text>
        </View>
        <View style={styles.receiptContainer}>
          <Image
            source={greenCheck}
            style={{
              width: 88,
              height: 88,
              marginTop: -30,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              margin: 6,
              fontSize: 30,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Thank You !
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              color: "#A7A7A7",
            }}
          >
            Your transaction was successful
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 30,
                width: 40,
                marginLeft: -20,
                borderRadius: 20,
                backgroundColor: "#fff",
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                fontSize: 50,
                fontWeight: "bold",
                alignSelf: "center",
                color: "#6C6C6C",
                marginLeft: 3,
                width: Dimensions.get("screen").width * 0.7,
              }}
            >
              ------------------
            </Text>
            <View
              style={{
                height: 30,
                width: 40,
                marginRight: -20,
                borderRadius: 20,
                backgroundColor: "#fff",
                alignSelf: "center",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#A7A7A7",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                DATE
              </Text>
              <Text
                style={{
                  color: "#00000",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {new Date().toDateString()}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: "#A7A7A7",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                TIME
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {new Date().toTimeString().split(' ')[0]}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#A7A7A7",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                TO
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {vendorName}
              </Text>
            </View>
            {/* <View>
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: "#A7A7A7",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                FROM
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Ramesh Kumar
              </Text>
            </View> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#A7A7A7",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Amount
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Rs.{couponValue}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  receiptContainer: {
    margin: 20,
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.5,
    borderRadius: 20,
    backgroundColor: "#DDDCDC",
  },
});
