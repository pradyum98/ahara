import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import barcodeScanner from "../assets/barcode-scanner.png";
import confirmed from "../assets/confirmedV2.jpeg";
import { Camera } from "expo-camera";
import Modal from "react-native-modal";
import transactionInProgress from "../assets/transactionInProgress.png";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../firebaseConfig/firebase";
import { auth } from "../firebaseConfig/firebase";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AnimatedLoader from "react-native-animated-loader";

import axios from "axios";

const { width, height } = Dimensions.get("window");
const qrSize = width * 0.7;

export default function HomePage() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [transactionConfirmed, setTransactionConfirmed] = React.useState(false);
  const [transactionSuccessful, setTransactionSuccessful] =
    React.useState(false);
    const [transactionUnsuccessful, setTransactionUnsuccessful] =
    React.useState(false);
  const [isQRValid, setIsQRValid] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [nameOfCouponHolder, setNameOfCouponHolder] = React.useState("");
  const [couponValue, setCouponValue] = React.useState("");
  const [aadharNumber, setAadharNumber] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [nameOfHospital, setNameOfHospital] = React.useState("");

  let qrData;
  const testData = {
    couponId: "3c3338a5-b521-4128-a804-284afaa7b6e5",
    createdAt: 1620702399393,
    validUpto: 1631218017000,
    couponValue: 20.529,
    couponName: "AHARA20",
    generationId: "842fa6a3-0986-43f6-a809-d3e597aaead5",
    nameOfCouponHolder: "SURESH YELGAON",
  };
  console.log(isFocused);
  let isTransactionConfirmed = false;
  const [torchEnabled, setTorchEnabled] = React.useState("off");

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [transactionConfirmed, torchEnabled]);

  const handleBarCodeScanned = async (data) => {
    setIsLoading(true);
    console.log(testData, "dataaaa---->");
    let qrDocument = await (
      await db.collection("qrData").doc(testData.generationId).get()
    ).data();
    qrData = qrDocument.totalCouponsData.filter(
      (coupon) => coupon.couponId === testData.couponId
    );
    console.log("qrData ------>", qrData);
    console.log("qrData ------>", qrData[0]["nameOfCouponHolder"]);
    setNameOfCouponHolder(qrData[0]["nameOfCouponHolder"]);
    setCouponValue(qrData[0]["couponValue"]);
    setAadharNumber(qrData[0]["aadharNumber"]);
    setLocation(qrData[0]["location"]);
    setNameOfHospital(qrData[0]["nameOfHospital"]);
    setScanned(true);
    setIsLoading(false);
  };

  const _renderButton = (text, onPress) => (
    <TouchableOpacity color="#f07049" style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    // <TouchableOpacity onPress={onPress}>
    //   <View style={styles.button}>
    //     <Text>{text}</Text>
    //   </View>
    // </TouchableOpacity>
  );
  const createPayoutRequest = async (testData) => {
    let userDoc = (
      await db
        .collection("users")
        .doc(auth.currentUser.phoneNumber.toString().split("+91")[1])
        .get()
    ).data();
    console.log({
      account_number: "2323230091369724",
      fund_account_id: userDoc.fundAccountId,
      amount: testData.couponValue * 100,
      currency: "INR",
      mode: "UPI",
      purpose: "payout",
      queue_if_low_balance: true,
    });
    try {
      console.log(payoutResponse);
      let payoutResponse = await axios.post(
        "https://api.razorpay.com/v1/payouts",
        {
          account_number: "2323230091369724",
          fund_account_id: userDoc.fundAccountId,
          amount: parseInt(testData.couponValue * 100, 10),
          currency: "INR",
          mode: "UPI",
          purpose: "payout",
          queue_if_low_balance: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic cnpwX3Rlc3RfZnJSRjhxYzJadWcybnY6NkFSYnd6VHVIb3drTnJrdWpZWE84cUR3",
          },
        }
      );
      console.log(payoutResponse, "Successful payout");
      return;
    } catch (err) {
      console.log("error in payout operation", err);
    }
  };

  const validateData = async (data) => {
    let validQR = true;
    try {
      let qrData = await db.collection("qrData").doc(data.generationId).get();
      let couponsArray = qrData.data().totalCouponsData;
      const qrCouponInDB = couponsArray.filter(
        (coupon) => coupon.couponId === data.couponId && coupon.active === true
      );
      console.log(
        "Phone number -------->",
        auth.currentUser.phoneNumber.toString()
      );
      console.log("qrCouponInDB -------------------->", qrCouponInDB);
      if (qrCouponInDB.length > 0) {
        console.log("inside if");
        if (new Date().getTime() > data.validUpto || data.active == false) {
          setIsQRValid(false);
          validQR = false;
          console.log("Coupin expired");
          return false;
        }
        let allCouponsExceptCurrent = couponsArray.filter(
          (coupon) => coupon.couponId !== data.couponId
        );
        let currentCouponObject = qrCouponInDB[0];
        currentCouponObject.active = false;
        allCouponsExceptCurrent.push(currentCouponObject);
        db.collection("qrData").doc(data.generationId).update({
          totalCouponsData: allCouponsExceptCurrent,
        });
        let userDoc = (await db.collection("users").doc(auth.currentUser.phoneNumber.toString().split("+91")[1]).get()).data();
        await db.collection("users").doc(auth.currentUser.phoneNumber.toString().split("+91")[1]).update({
          grossSales : parseFloat(userDoc.grossSales) + parseFloat(data.couponValue), 
        })
        await db
          .collection("users")
          .doc(auth.currentUser.phoneNumber.toString().split("+91")[1])
          .collection("transactions")
          .add({
            createdAt: new Date(),
            receivedAmount: data.couponValue,
            receivedFrom: data.nameOfCouponHolder,
          });
        console.log("transaction updated");
      } else {
        console.log("inside else");
        setIsQRValid(false);
        validQR = false;
        return false;
      }
    } catch (err) {
      console.log("error --->", err);
    }
    console.log(isQRValid, "<------------- isQRValid");
    console.log(validQR, "<------------- validQR");

    return validQR;
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.viewContainer}>
        <Text>Home Page</Text>
        {isFocused && (
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ratio="16:9"
            flashMode={torchEnabled}
            style={[StyleSheet.absoluteFillObject]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign name="leftcircleo" size={35} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (torchEnabled === "torch") {
                    setTorchEnabled("off");
                  } else {
                    setTorchEnabled("torch");
                  }
                }}
              >
                <Ionicons name="flash" size={35} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>Scan QR code</Text>
            <Text style={styles.subText}>
              Scan the code in the provided Ahara coupon
            </Text>
            {/* <Image style={styles.qr} source={barcodeScanner} /> */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Ionicons
                name="ios-scan-outline"
                size={width * 0.7}
                color="white"
                style={styles.qr}
              />
            </View>

            {/* <Text
        //   onPress={() => navigation.pop()}
          style={styles.cancel}>
          Cancel
        </Text> */}
          </Camera>
        )}
        <AnimatedLoader
          visible={isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../assets/loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        ></AnimatedLoader>
        <Modal
          isVisible={scanned}
          animationIn={"slideInLeft"}
          animationOut={"slideOutRight"}
          //backdropOpacity={0.999}
          //backdropColor={"white"}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirm Coupon Details!</Text>
            <Image
              source={confirmed}
              style={{
                marginTop: 10,
                width: width * 0.6,
                height: height * 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            {scanned && (
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginHorizontal: 60,
                    marginVertical: 20,
                    borderStyle: "dashed",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontSize: 20,
                      }}
                    >
                      Name :{" "}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{nameOfCouponHolder}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontSize: 20,
                      }}
                    >
                      Coupon Value :{" "}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{couponValue}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontSize: 20,
                      }}
                    >
                      Aadhar Number :{" "}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{aadharNumber}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontSize: 20,
                      }}
                    >
                      Location :{" "}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{location}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontSize: 20,
                      }}
                    >
                      Name of Hospital:{" "}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{nameOfHospital}</Text>
                  </View>
                </View>
              </View>
            )}
            <View style={{ flexDirection: "row" }}>
              {_renderButton("Cancel", () => setScanned(null))}
              {_renderButton("Confirm Details", async () => {
                setTransactionConfirmed(true);
                // isTransactionConfirmed = true;
                let isValid = await validateData(testData);
                if (isValid) {
                  await createPayoutRequest(testData);
                  setScanned(null);
                  setTransactionConfirmed(false);
                  setTransactionSuccessful(true);
                  setTimeout(() => {
                    setTransactionSuccessful(false);
                    navigation.navigate("TransactionReceipt", testData);
                  }, 3500);
                } else {
                  console.log("Invalid Coupon or coupon already used");
                  setScanned(null);
                  setTransactionConfirmed(false);
                  setTransactionUnsuccessful(true);
                  setTimeout(() => {
                    setTransactionUnsuccessful(false);
                    navigation.navigate("HomeUserPage");
                  }, 3500);
                }
              })}
            </View>
          </View>
        </Modal>

        {/* <Modal
          isVisible={transactionConfirmed}
          animationIn={"slideInLeft"}
          animationOut={"slideOutRight"}
          backdropOpacity={0.999}
          backdropColor={"white"}
        > */}
        {/* <View style={styles.modalContent}> */}
        {/* <Text style={styles.modalText}>Transaction in Progress</Text> */}
        {/* <Image
              source={transactionInProgress}
              style={{
                marginTop: 10,
                width: width * 0.6,
                height: height * 0.4,
                justifyContent: "center",
                alignItems: "center",
              }}
            /> */}
        <AnimatedLoader
          visible={transactionConfirmed}
          overlayColor="white"
          source={require("../assets/inProgress.json")}
          animationStyle={{
            width: width * 0.6,
            height: height * 0.4,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -80,
          }}
          speed={1}
        >
          <Text style={styles.modalText}>Transaction in Progress</Text>
        </AnimatedLoader>
        <AnimatedLoader
          visible={transactionSuccessful}
          overlayColor="white"
          source={require("../assets/successTick.json")}
          loop={false}
          animationStyle={{
            marginTop: 10,
            width: "100%" ,
            height: "100%" ,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -80,
          }}
          speed={1}
        ></AnimatedLoader>
        <AnimatedLoader
          visible={transactionUnsuccessful}
          overlayColor="white"
          source={require("../assets/failed.json")}
          loop={false}
          animationStyle={{
            marginTop: 10,
            width: 100 ,
            height: 100 ,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -80,
          }}
          speed={1}
        ></AnimatedLoader>

        {/* </View> */}
        {/* </Modal> */}
      </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent : "center"
  },
  modalText: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
    elevation: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  qr: {
    // marginTop: "1%",
    marginBottom: "20%",
    // width: qrSize,
    // height: qrSize,
    alignSelf: "center",
  },

  description: {
    fontSize: width * 0.09,
    marginTop: "20%",
    textAlign: "center",
    width: "100%",
    color: "white",
    fontWeight: "bold",
  },
  subText: {
    fontSize: width * 0.04,
    textAlign: "center",
    width: "100%",
    color: "white",
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
    alignSelf: "center",
  },
  // button: {
  //   backgroundColor: "lightblue",
  //   padding: 12,
  //   margin: 26,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 4,
  //   borderColor: "rgba(0, 0, 0, 0.1)",
  // },
  lottie: {
    width: 100,
    height: 100,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#FF7E56",
    padding: 10,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    width: "40%",
    color: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 10,
  },
  text: {
    color: "#fff",
    // alignSelf : "center",
    // justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
});
