import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();

export default function SignUp({navigation}) {
  const [mobileNumber, onChangeMobileNumber] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeMobileNumber}
        value={mobileNumber}
        placeholder="Enter Mobile Number"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        textContentType={password}
        placeholder="Enter Password"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfirmPassword}
        value={confirmPassword}
        textContentType={password}
        placeholder="Confirm Password"
      />
      <Button
        title="Sign Up"
        onPress={async () => {
          if (password != confirmPassword) {
            alert("Password and Confirm Password Fields do not match!");
          } else {
            await db.collection("users").doc(mobileNumber).set({
              mobileNumber: mobileNumber,
              name: "dummyName",
              location: "dummyLocation",
            });
            alert("User data added!");
            navigation.navigate('Login');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
