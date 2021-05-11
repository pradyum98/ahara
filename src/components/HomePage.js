import React from "react";
import { View, Text, StyleSheet, Button ,Dimensions,Image} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import barcodeScanner from "../assets/barcode-scanner.png";
import { Camera } from 'expo-camera';


const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

export default function HomePage({ navigation }) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let qrData = data;

    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // const validateData = (data) => {
  //   if(new Date().getTime() > data.validUpto){

  //   }
  // }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }



  return (
    <View style={styles.viewContainer}>
      <Text>Home Page</Text>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio='16:9'
  style={[StyleSheet.absoluteFillObject]}
      >
        <Text style={styles.description}>Scan your QR code</Text>
        <Image style={styles.qr} source={barcodeScanner} />
        {/* <Text
        //   onPress={() => navigation.pop()}
          style={styles.cancel}>
          Cancel
        </Text> */}
      </Camera>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  qr: {
    marginTop: "40%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize,
    alignSelf:"center"

  },
  description: {
    fontSize: width * 0.09,
    marginTop: "20%",
    textAlign: "center",
    width: "100%",
    color: "white",
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
    alignSelf:"center"
  },
});
