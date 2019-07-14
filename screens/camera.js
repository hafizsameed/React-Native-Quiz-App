import React from 'react'
import {Button, Platform,StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default class Cam extends React.Component{

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        pic:'',
      };
    
      static navigationOptions = {
        title: 'Face Detection',
      };

      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }
    async capture(){
    const photo=await this.camera.takePictureAsync();
    this.setState({pic:photo.uri,captured:true})
    const options = { mode: FaceDetector.Constants.Mode.fast };
    const detected = await FaceDetector.detectFacesAsync(photo.uri, options);
    if(detected.faces.length){
        this.setState({faceDetected:true})
    }
    else{
        this.setState({faceDetected:false})
    }

    }

      render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
              !this.state.pic.length ?
            <View style={{ flex: 1 }}>
                 <Camera 
              ref={ref=>this.camera=ref}
              style={{ flex: 1 }} type={this.state.type}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent:'space-evenly',
                    alignItems:'flex-end'
                  }}>

                      <TouchableOpacity onPress={()=>{this.capture()}}>
                    <Image source={require('../assets/click.png')} />
                      </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            type:
                            this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                        });
                    }}>
                    <Image source={require('../assets/flip.png')}/>
                  </TouchableOpacity>
                    </View>
              </Camera>
            </View>
                     : <View style={{flex:1}}>
                         <Image style={{width:'100%',height:'90%'}} source={{uri:this.state.pic}}/>
                         {!!this.state.faceDetected ? 
                         <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20}}>Face Detected</Text>
                            <Button onPress={()=>{this.props.navigation.navigate('Quiz')}} title="Next"/>
                         </View> :
                         <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20}}>Face Not Detected</Text>
                            <Button onPress={()=>{this.setState({pic:''})}} title="Capture Again"/>

                         </View>
                         
                        }
                          </View> 
          );
        }

    }
}  