import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  };

  handleBarCodeScanned = async ({type, data})=>{
    this.setState({
      scanned:true,
      scannedData: data,
      buttonState: 'normal'
    })
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(buttonState === 'clicked' && hasCameraPermissions){
      return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
      );
    }
    else if(buttonState === 'normal'){
      return (
        <View style={styles.container}>
          <Image
          style={styles.imageIcon}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
            }}
          />
          <Text style={styles.displayText}>
            {hasCameraPermissions === true? this.state.scannedData: "requestCameraPermissions"}
          </Text>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermissions}
            title="Barcode Scanner">
            <Text style={styles.buttonText}>Scan QR Code / Bar Code</Text>
          </TouchableOpacity>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    margin: 15,
  },
  buttonText: {
    fontSize: 25,
    color: 'lightgreen'
  },
  imageIcon: {
    width: 250,
    height: 250,
    marginBottom:40
  }
});
