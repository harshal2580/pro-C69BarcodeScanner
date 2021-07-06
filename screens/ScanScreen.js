import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Facebook extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }

   getCameraPermissions=async() => {
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status==="granted",
      buttonState:'clicked',
      scanned:false
    });
  }

  handleBarCodeScanned=async({type,data}) => {
     this.setState({
       scanned:true,
       scannedDate:data,
       buttonState:'normal'
     });
  }

  render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==="clicked" && hasCameraPermissions) {
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        );
      }
     else if(buttonState === "normal") {
       
      return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />

        <Text style={styles.textContainer}>Bar Code Scanner</Text>
          <Text style={styles.displayText}>
           {hasCameraPermissions===true ? this.state.scannedDate :"Request Camera Permission"}

          </Text>

        <TouchableOpacity 
          onPress={this.getCameraPermissions}
          style={styles.scanButton}>
          <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
         </View> 
      );

}
  }
}

const styles = StyleSheet.create({
  displayText:{
      fontSize:15,
      textDecorationLine:'underline'
    },
    scanButton:{
      backgroundColor:'red',
      padding:10,
      margin:10
    },
    buttonText:{
      fontSize:20
    },
    imageIcon: {
    width: 150,
    height: 150,
    marginLeft: -90,
  },
  textContainer:{
    fontSize:30,
  }
})