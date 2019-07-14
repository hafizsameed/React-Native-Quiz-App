import React from 'react'
import {Button, Platform,StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';


export default class Result extends React.Component{
render(){
    console.log(this.props.navigation.getParam('correct'),'props');
  return(
    <View style={{flex:1,backgroundColor:'#8ED433',alignItems:'center',
    justifyContent:'flex-start'}}>
      <Image style={{marginTop:'5%'}} source={require('../assets/images.png')}/>
      <View style={{flex:0.4,alignSelf:'center',padding:'10%',flexDirection:'column'}}>
      <Text style={{fontSize:40,color:'white',fontWeight:'900'}}>SAWAAL</Text>
      <Text style={{fontSize:40,color:'white',fontWeight:'900'}}> JAWAB</Text>
      </View>
      <View style={{flex:1,flexDirection:'column',alignItems:'flex-start',backgroundColor:"white"
          ,width:"55%",padding:10,justifyContent:'center'}}>
          <Text style={{fontSize:30,color:'white',padding:10,textAlign:'center',backgroundColor:'#487908',width:'100%'}}>Result</Text>
          <Text style={{fontSize:20,color:'black',padding:10}}>Attempted:{this.props.navigation.getParam('index')+1}</Text>
          <Text style={{fontSize:20,color:'black',padding:10}}>Correct:{this.props.navigation.getParam('correct')+1}</Text>
          <Text style={{fontSize:20,color:'black',padding:10}}>Wrong:{this.props.navigation.getParam('wrong')}</Text>
      </View>
      <View style={{padding:10,width:'100%',backgroundColor:'white',borderTopWidth:1}}> 
      <Button onPress={()=>{this.props.navigation.navigate('Start')}} color='#487908'  title='Start Again'/>
      </View>
    </View>
  )  
}



}  