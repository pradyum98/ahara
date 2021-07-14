import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import userIcon from "../assets/userIconHome.png";
import userLifeCycle from "../assets/userLifeCycle.png";
import termsOfUse from "../assets/termsOfUse.png";
import privacyPolicy from "../assets/privacyPolicy.png";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function UserPage({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginVertical: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="leftcircleo" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              borderWidth: 0.5,
              width: Dimensions.get("screen").width * 0.5,
              borderLeftColor: "#fff",
              borderTopColor: "#fff",
              borderBottomColor: "#fff",
              borderRightColor: "grey",
            }}
          >
            <View
              style={{
                borderWidth: 4,
                borderRightColor: "#B94826",
                borderTopColor: "#B94826",
                borderLeftColor: "#B94826",
                borderBottomColor: "#B94826",
                borderEndColor: "#fff",
                marginVertical: 10,
                marginHorizontal: 30,
                width: Dimensions.get("screen").width * 0.3,
                height: Dimensions.get("screen").width * 0.3,
                justifyContent: "center",
                alignContent: "center",
                borderRadius: Dimensions.get("screen").width * 0.3,
              }}
            >
              <Image
                source={userIcon}
                style={{
                  width: Dimensions.get("screen").width * 0.2,
                  height: Dimensions.get("screen").width * 0.2,
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 30,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              The Golden Palms
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 30, marginHorizontal: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Pradyum</Text>
          <Text style={{ fontSize: 30, fontWeight: "300", color: "grey" }}>
            Menon
          </Text>
        </View>
        <View>
          <View style={styles.userTab}>
            <View
              style={{
                marginHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <Image
                source={privacyPolicy}
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
                alignContent: "center",
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <Text style={{ margin: 0, fontWeight: "bold", fontSize: 15 }}>
                  Privacy Policy
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  backgroundColor: "#FF9A7B",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignContent: "center",
                  //padding: 12,
                  borderRadius: 10,
                  alignSelf: "center",
                  alignItems : "center"
                }}
              >
                <SimpleLineIcons name="arrow-right" size={15} color="black"/>
              </View>
            </View>
          </View>
          <View style={styles.userTab}>
            <View
              style={{
                marginHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <Image
                source={termsOfUse}
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
                alignContent: "center",
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <Text style={{ margin: 0, fontWeight: "bold", fontSize: 15 }}>
                  Terms of Use
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  backgroundColor: "#FF9A7B",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignContent: "center",
                  // padding: 12,
                  borderRadius: 10,
                  alignSelf: "center",
                  alignItems: "center"
                }}
              >
                <SimpleLineIcons name="arrow-right" size={15} color="black" />
              </View>
            </View>
          </View>
          <View style={styles.userTab}>
            <View
              style={{
                marginHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <Image
                source={userLifeCycle}
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
                alignContent: "center",
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <Text style={{ margin: 0, fontWeight: "bold", fontSize: 15 }}>
                  Profile
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  backgroundColor: "#FF9A7B",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignContent: "center",
                  // padding: 12,
                  borderRadius: 10,
                  alignSelf: "center",
                  alignItems : "center"
                }}
              >
                <SimpleLineIcons name="arrow-right" size={15} color="black" />
              </View>
            </View>
          </View>
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
    flex: 1,
  },
  userTab: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
