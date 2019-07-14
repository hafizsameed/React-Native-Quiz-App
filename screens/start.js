import React from 'react'
import {Button, Platform,StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';


export default class Start extends React.Component{
render(){
  return(
    <View style={{flex:1,backgroundColor:'#8ED433',alignItems:'center',
    justifyContent:'flex-start'}}>
      <Image style={{marginTop:'5%'}} source={require('../assets/images.png')}/>
      <View style={{flex:1,alignSelf:'center',padding:'10%'}}>
      <Text style={{fontSize:40,color:'white',fontWeight:'900'}}>SAWAAL</Text>
      <Text style={{fontSize:40,color:'white',fontWeight:'900'}}> JAWAB</Text>
      </View>
      <View style={{padding:10,width:'100%',backgroundColor:'white'}}> 
      <Button onPress={()=>{this.props.navigation.navigate('Cam')}} color='#487908'  title='READY'/>
      </View>
    </View>
  )  
}



}  