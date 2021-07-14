import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";

export default function PassbookPage({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [totalSales,setTotalSales] = useState(0);
  let imageArray = [user1, user2, user3];

  const [transactionArray, setTransactionArray] = React.useState([]);
  const [filteredTransactionArray, setFilteredTransactionArray] =
    React.useState([]);

  React.useEffect(() => {
    function getUserData() {
      console.log(auth.currentUser.phoneNumber.toString().split("+91")[1]);
      let userId = auth.currentUser.phoneNumber.toString().split("+91")[1];
      let transactions = [];
      db.collection("users").doc(userId).get().then((doc) => {
        setTotalSales(doc.data().grossSales);
      });
      db.collection("users")
        .doc(userId)
        .collection("transactions")
        .onSnapshot((doc) => {
          doc.forEach((transactionDoc) => {
            let transactionObj = transactionDoc.data();
            transactionObj.date = new Date(
              transactionDoc.data().createdAt.seconds * 1000
            ).toDateString();
            transactions.push(transactionObj);
          });
          setTransactionArray(transactions);
        });
    }
    getUserData();
  }, [db,totalSales]);

  React.useEffect(() => {
    let filteredtransactions = transactionArray.filter(
      (transaction) =>
        transaction.date.split(" ")[1] + transaction.date.split(" ")[2] ===
        new Date(date).toDateString().split(" ")[1] +
          new Date(date).toDateString().split(" ")[2]
    );
    setFilteredTransactionArray(filteredtransactions);
    //console.log(transactionArray);
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="leftcircleo" size={35} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginHorizontal : 10,
            }}
          >
            My Passbook
          </Text>
        </View>
        <View style={styles.totalSalesContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Total Sales</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 23, fontWeight: "bold", color: "white" }}>
              Rs. {totalSales}
            </Text>
          </View>
        </View>
        <View style={styles.transactionsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Transactions
            </Text>
            <View
              style={{
                borderColor: "grey",
                borderWidth: 0.1,
                borderRadius: 20,
                padding: 5,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={{ marginHorizontal: 5 }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "normal" }}>
                    {date.toDateString()}
                  </Text>
                </TouchableOpacity>
                <AntDesign name="down" size={15} color="black" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>
          <FlatList
            data={filteredTransactionArray}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator = {false}
            renderItem={({ item }) => (
              <View style={styles.transactionContainer}>
                <View
                  style={{
                    width: Dimensions.get("window").width * 0.13,
                    height: Dimensions.get("window").width * 0.13,
                    backgroundColor: "#fff",
                    marginHorizontal: 10,
                    backgroundColor: "#fff",
                  }}
                >
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
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{ margin: 3, fontSize: 14, fontWeight: "bold" }}
                    >
                      {item.receivedFrom}
                    </Text>
                    <Text style={{ margin: 3, fontSize: 12 ,fontStyle : "italic"}}>{item.date}</Text>
                  </View>
                  <View style={{ margin: 3 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#0E520D",
                      }}
                    >
                      Rs {item.receivedAmount}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  totalSalesContainer: {
    height: Dimensions.get("screen").height * 0.1,
    width: "88%",
    backgroundColor: "#A94C2F",
    alignSelf: "center",
    borderRadius: 20,
    elevation : 20,
  },
  transactionsContainer: {
    height: Dimensions.get("screen").height * 0.6,
    width: "88%",
    backgroundColor: "#FFFDF9",
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 20,
    elevation: 3,
  },
  flatListContainerStyle: {
    width: Dimensions.get("screen").width,
    marginVertical: 20,
  },
  transactionContainer: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 0,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#FFFDF9",
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
});
