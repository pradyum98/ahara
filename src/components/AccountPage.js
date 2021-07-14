import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import userAccountsBackground from "../assets/UserUpperBackground.png";
import arrowBorder from "../assets/arrowBorder.png";
import arrow from "../assets/arrow.png";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function AccountPage({navigation}) {
  return (
    <ImageBackground
      source={userAccountsBackground}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            margin: 50,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            User Settings
          </Text>
          <Text
            style={{
              fontSize: 26,
              //fontWeight: "bold",
              margin: 40,
            }}
          >
            Account
          </Text>
        </View>
        <View style={styles.transactionContainer}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.16,
              height: Dimensions.get("window").width * 0.16,
              backgroundColor: "#C4C4C4",
              marginHorizontal: 10,
              borderRadius: Dimensions.get("window").width * 0.16,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                margin: 10,
                fontWeight: "bold",
                fontSize: 22,
              }}
            ></Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18 }}>
                Harry Venugopal
              </Text>
              <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18 }}>
                Personal Info
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                margin: 5,
                backgroundColor: "#C4C4C4",
                width: 51,
                height: 51,
                justifyContent: "center",
                alignContent: "center",
                padding: 12,
                borderRadius: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProfilePage");
                }}
              >
                <SimpleLineIcons name="arrow-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              margin: 20,
            }}
          >
            Settings
          </Text>
        </View>
        <View style={styles.transactionContainer}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.16,
              height: Dimensions.get("window").width * 0.16,
              backgroundColor: "#C4C4C4",
              marginHorizontal: 10,
              borderRadius: Dimensions.get("window").width * 0.16,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                margin: 10,
                fontWeight: "bold",
                fontSize: 22,
              }}
            ></Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Notifications
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                margin: 5,
                backgroundColor: "#C4C4C4",
                width: 51,
                height: 51,
                justifyContent: "center",
                alignContent: "center",
                padding: 12,
                borderRadius: 15,
              }}
            >
              <SimpleLineIcons name="arrow-right" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.16,
              height: Dimensions.get("window").width * 0.16,
              backgroundColor: "#C4C4C4",
              marginHorizontal: 10,
              borderRadius: Dimensions.get("window").width * 0.16,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                margin: 10,
                fontWeight: "bold",
                fontSize: 22,
              }}
            ></Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Privacy Policy
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                margin: 5,
                backgroundColor: "#C4C4C4",
                width: 51,
                height: 51,
                justifyContent: "center",
                alignContent: "center",
                padding: 12,
                borderRadius: 15,
              }}
            >
              <SimpleLineIcons name="arrow-right" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <View
            style={{
              width: Dimensions.get("window").width * 0.16,
              height: Dimensions.get("window").width * 0.16,
              backgroundColor: "#C4C4C4",
              marginHorizontal: 10,
              borderRadius: Dimensions.get("window").width * 0.16,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                margin: 10,
                fontWeight: "bold",
                fontSize: 22,
              }}
            ></Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18 }}>
                {" "}
                Terms Of Use
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                margin: 5,
                backgroundColor: "#C4C4C4",
                width: 51,
                height: 51,
                justifyContent: "center",
                alignContent: "center",
                padding: 12,
                borderRadius: 15,
              }}
            >
              <SimpleLineIcons name="arrow-right" size={24} color="black" />
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
    //alignItems: "center",
  },
  receiptContainer: {
    margin: 20,
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.5,
    borderRadius: 20,
    backgroundColor: "#DDDCDC",
  },
  transactionContainer: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
