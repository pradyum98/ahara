import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import logo from "../assets/Logo.png";
import masterCard from "../assets/masterCard.png";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";
import userIcon from "../assets/userIconHome.png";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import AnimatedLoader from "react-native-animated-loader";

export default function HomeUserPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [transactionList, setTransactionList] = React.useState([]);
  const [grossSales, setGrossSales] = React.useState("");
  const [transactionArray, setTransactionArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  let backgroundColorArray = ["#FFF0D3", "#E9E3D5", "#FFE5DD"];
  let imageArray = [user1, user2, user3];
  async function getUserData() {
    setIsLoading(true);
    console.log(auth.currentUser.phoneNumber.toString().split("+91")[1]);
    let userId = auth.currentUser.phoneNumber.toString().split("+91")[1];
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        console.log(data);
        let data = doc.data();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGrossSales(data.grossSales);
        console.log(firstName);
      });
    console.log(firstName);
    let transactions = [];
    db.collection("users")
      .doc(userId)
      .collection("transactions")
      .orderBy("createdAt", "desc")
      .limit(3)
      .onSnapshot((doc) => {
        doc.forEach((transactionDoc) => {
          console.log(transactionDoc);
          let transactionObj = transactionDoc.data();
          transactionObj.date = new Date(
            transactionDoc.data().createdAt.seconds * 1000
          ).toDateString();
          transactions.push(transactionObj);
        });
        setTransactionArray(transactions);
        setIsLoading(false);
        console.log(transactionArray);
      });
  }
  React.useEffect(() => {
    getUserData();
  }, [db,grossSales]);

  return (
    <>
      <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../assets/loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      ></AnimatedLoader>
      <View style={styles.container}>
        <ScrollView
         contentContainerStyle={{ paddingBottom: 80}}
          nestedScrollEnabled={true}
        >
          <View style={styles.upperRowContainer}>
            <View style={styles.userNameContanier}>
              <Text
                style={{
                  fontSize: 25,
                  alignSelf: "flex-start",
                  marginLeft: 10,
                }}
              >
                Hello ,
              </Text>
              <Text
                style={{
                  fontSize: Dimensions.get("screen").width * 0.06,
                  alignSelf: "flex-start",
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {firstName}
              </Text>
            </View>
            <View>
              <Image
                source={userIcon}
                style={{
                  width: 73,
                  height: 75,
                  margin: 60,
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.cardContainerOverlay,
              { transform: [{ rotate: "160deg" }], backgroundColor: "#CB8600" },
            ]}
          ></View>
          <View
            style={[
              styles.cardContainerOverlay,
              { transform: [{ rotate: "170deg" }], backgroundColor: "#A94C2F" },
            ]}
          ></View>
          <View style={styles.cardContainer}>
            <View>
              <Text
                style={{
                  color: "#fff",
                  margin: 20,
                  marginLeft: 20,
                  fontSize: 45,
                  fontWeight: "bold",
                }}
              >
                Rs.{grossSales}
              </Text>
              <Text style={{ color: "#fff", marginLeft: 20, fontSize: 25 }}>
                Total Sales
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {/* <View>
            <Text style={{ marginLeft: 20 }}>2371 **** **** *****</Text>
            <Text style={{ marginLeft: 20, marginBottom: 20 }}>
              {firstName} {lastName}
            </Text>
          </View> */}
              <View>
                <Image
                  source={logo}
                  style={{
                    width: 53,
                    height: 50,
                    alignSelf: "center",
                    marginRight: 20,
                    margin: 10,
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.paymentContainer}>
            <Text
              style={{
                alignSelf: "center",
                margin: 20,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              New Transaction
            </Text>
            <View
              style={{
                backgroundColor: "white",
                //padding: 10,
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
                margin: 20,
                width: Dimensions.get("screen").width * 0.1,
                height: Dimensions.get("screen").height * 0.04,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 45,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                marginLeft: 40,
                marginTop: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Transactions
            </Text>
            <FlatList
              data={transactionArray}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                // <View style={styles.transactionContainer}>
                //   <View
                //     style={{
                //       width: Dimensions.get("window").width * 0.13,
                //       height: Dimensions.get("window").width * 0.13,
                //       backgroundColor: "grey",
                //       marginLeft: 20,
                //       borderRadius: 10,
                //     }}
                //   >
                //     <Text
                //       style={{
                //         alignSelf: "center",
                //         margin: 10,
                //         fontWeight: "bold",
                //         fontSize: 22,
                //       }}
                //     >
                //       {item.receivedFrom[0]}
                //     </Text>
                //   </View>
                //   <View
                //     style={{
                //       flex: 1,
                //       flexDirection: "row",
                //       justifyContent: "space-between",
                //     }}
                //   >
                //     <View style={{ flexDirection: "column" }}>
                //       <Text style={{ margin: 5 }}>{item.receivedFrom}</Text>
                //       <Text style={{ margin: 5 }}>{item.date}</Text>
                //     </View>
                //     <View style={{ margin: 5 }}>
                //       <Text>Rs {item.receivedAmount}</Text>
                //     </View>
                //   </View>
                // </View>
                <View
                  style={[
                    styles.transactionContainerV2,
                    {
                      backgroundColor:
                        backgroundColorArray[
                          Math.floor(
                            Math.random() * backgroundColorArray.length
                          )
                        ],
                    },
                  ]}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <Text
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    // margin: 10,
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  {item.receivedFrom[0]}
                </Text> */}
                    <Image
                      source={
                        imageArray[
                          Math.floor(Math.random() * imageArray.length)
                        ]
                      }
                      style={{
                        alignSelf: "center",
                        alignItems: "center",
                        // margin: 10,
                        width: 55,
                        height: 55,
                      }}
                    />
                    <Text style={{ margin: 5, fontWeight: "bold" }}>
                      {item.receivedFrom}
                    </Text>
                    <Text
                      style={{
                        margin: 5,
                        fontStyle: "italic",
                        fontWeight: "500",
                      }}
                    >
                      {item.date}
                    </Text>
                    <Text style={{ fontStyle: "italic", fontWeight: "700" }}>
                      Rs {item.receivedAmount}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "10%",
  },
  userNameContanier: {
    width: Dimensions.get("window").width * 0.34,
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 20,
    marginLeft: 28,
    marginTop: 60,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  upperRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: Dimensions.get("window").width - 56,
    height: Dimensions.get("window").height * 0.25,
    borderRadius: 25,
    margin: 28,
    backgroundColor: "#3C3A3A",
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 28,
  },
  cardContainerOverlay: {
    width: Dimensions.get("window").width - 56,
    height: Dimensions.get("window").height * 0.25,
    borderRadius: 25,
    margin: 28,
    position: "absolute",
    top: 182,
    transform: [{ rotate: "170deg" }],
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 28,
  },
  paymentContainer: {
    width: Dimensions.get("window").width - 56,
    height: Dimensions.get("window").height * 0.07,
    borderRadius: 25,
    margin: 30,
    backgroundColor: "#FFEDBF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionContainer: {
    marginLeft: 10,
    margin: 18,
    flexDirection: "row",
  },
  transactionContainerV2: {
    elevation: 5,
    marginLeft: 30,
    marginVertical: 10,
    borderRadius: 45,
    height: Dimensions.get("screen").height * 0.16,
    width: Dimensions.get("screen").width * 0.38,
    flexDirection: "row",
    backgroundColor: "grey",
    alignContent: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
