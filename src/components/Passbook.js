import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { auth } from "../firebaseConfig/firebase";
import { db } from "../firebaseConfig/firebase";
import DateSelector from "./DatePicker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Passbook() {
  let currentDate = new Date().toISOString();

  const [transactionArray, setTransactionArray] = React.useState([]);
  const [filteredTransactionArray, setFilteredTransactionArray] = React.useState([]);
  const [availableDates,setAvailableDates] = React.useState([]);

  const [selectedDate, setSelectedDate] = React.useState(new Date(currentDate.split("T")[0]).getTime());

  // const onSelectDate = (date) => {
  //   let filteredArray = transactionArray.filter(
  //     (transaction) => ((transaction.date.split(" ")[1] + transaction.date.split(" ")[2]) === (new Date(selectedDate).toDateString().split(" ")[1]+new Date(selectedDate).toDateString().split(" ")[2]))
  //   )
  //   setTransactionArray(filteredArray);
  //   setSelectedDate(date);
  //   console.log("on Select Date log ------------------>",transactionArray);
  // }


  React.useEffect(() => {
    function getUserData() {
      console.log(auth.currentUser.phoneNumber.toString().split("+91")[1]);
      let userId = auth.currentUser.phoneNumber.toString().split("+91")[1];
      let transactions = [];
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
    let currentDate = new Date().toISOString();
    availableDates.push(new Date(currentDate.split("T")[0]).getTime());
    let monthCount = 0;
    while (monthCount < 31) {
      availableDates.push(availableDates[monthCount] - 24 * 60 * 60 * 1000);
      monthCount++;
    }
    availableDates.reverse();
    getUserData();
  }, [db]);

  React.useEffect(() => {
    let filteredtransactions = transactionArray.filter(
      (transaction) => (transaction.date.split(" ")[1] + transaction.date.split(" ")[2]) === (new Date(selectedDate).toDateString().split(" ")[1]+new Date(selectedDate).toDateString().split(" ")[2])
    )
    setFilteredTransactionArray(filteredtransactions);
    console.log(transactionArray);
  },[selectedDate])

  //const [selectedDate , setSelectedDate] = React.useState("");

  return (
    <View
      style={{
        margin: 10,
        flex: 1,
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 28,
          fontWeight: "bold",
          margin: 30,
        }}
      >
        E-Passbook
      </Text>
      {/* <HorizontalDatepicker
        mode="gregorian"
        // startDate={new Date(new Date().getTime() - 3600*1000*24*4)}
        startDate = {new Date("2021-05-21")}
        endDate={new Date()}
        initialSelectedDate={new Date()}
        onSelectedDateChange={(date) => 
          {setSelectedDate(date)
          console.log(selectedDate);
          }}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={48}
        itemRadius={10}
        selectedItemBackgroundColor="#E1BD61"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      /> */}
      <View>
        <DateSelector
          dates={availableDates}
          loading={false}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>

      <FlatList
        data={filteredTransactionArray}
        renderItem={({ item }) => (
          <View style={styles.transactionContainer}>
            <View
              style={{
                width: Dimensions.get("window").width * 0.13,
                height: Dimensions.get("window").width * 0.13,
                backgroundColor: "#fff",
                marginHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  margin: 10,
                  fontWeight: "bold",
                  fontSize: 22,
                }}
              >
                {item.receivedFrom[0]}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={{ margin: 5 }}>{item.receivedFrom}</Text>
                <Text style={{ margin: 5 }}>{item.date}</Text>
              </View>
              <View style={{ margin: 5 }}>
                <Text>Rs {item.receivedAmount}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainerStyle: {
    width: Dimensions.get("screen").width,
    marginVertical: 20,
  },
  transactionContainer: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    margin: 18,
    flexDirection: "row",
    backgroundColor: "#F6E0A7",
  },
});
