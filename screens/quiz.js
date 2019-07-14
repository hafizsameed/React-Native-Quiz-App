import React from 'react'
import {Button, Platform,StyleSheet, Text, View ,TextInput,TouchableOpacity,Image,TouchableWithoutFeedback} from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
export default class Quiz extends React.Component{
    state={
        questions:[],
        index:0,
        correct:0,
        wrong:0,
        next:true,
        sec:0,
        min:0,
        flag:true
    }
    next(){
      this.setState({next:true})
      const {wrong,questions,index,selectedOption,correct}=this.state;
      if(index>=9){  
        this.setState({flag:false})
        this.props.navigation.navigate('Result',{correct:correct,wrong:wrong,index:index})
      }
       if(questions[index].correct_answer===selectedOption){
        this.setState({correct:correct+1})
      }
      else{
        this.setState({wrong:wrong+1});
      }
      this.setState({index:index+1})



    }
    timer(){
      setInterval(() => {
        const {min,sec,flag}=this.state
        if(flag){
          if(sec>59){
            this.setState({min:min+1,sec:0});
          }
          else{
            this.setState({sec:sec+1})
          }
        }
        }, 1000);
    }
    getdata(){
        var arr=[]
        var option=[]
        fetch('https://opentdb.com/api.php?amount=10')
        .then((succ)=>{
        return succ.json()
        })
        .then((data)=>{
          data.results.map((each)=>{
            option=[...each.incorrect_answers];
            var random=Math.round(Math.random()*3);
            // console.log(random);
            var temp=option[random];
            option[random]=each.correct_answer;
            for(i=0;i<4;i++)
            if(option[i]===''||option[i]===undefined){
              option[i]=temp;
            }
            this.setState({start:true})
            // console.log(option,'options')
            // option.push(temp);
            each.options=[...option];
            arr.push(each);
            // console.log(each,'each');
          })
          this.setState({questions:arr})
          this.timer()
        })
        .catch((e)=>{
          alert(e);
            console.log(e);
        })
    }
    componentWillMount(){
        this.getdata()
        
    }
   
render(){
  

    function setSelectedOption(selectedOption) {
      this.setState({
        selectedOption,
        next:false
      });
    }

    function renderOption(option, selected, onSelect, index) {
      const style = selected ? { padding:10,fontSize:20,fontWeight: 'bold' } : {padding:10,fontSize:20};

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }
    const {index,questions,sec,min} = this.state;
     var options=!!questions.length && questions[index].options;
    return(
    <View style={{flex:1,marginTop:'5%'}}>
    <View style={{flex:0.4,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#8ED433'}}>
      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>Sawaal</Text>
      <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}> Jawab</Text>
      </View>
    </View>
    <View style={{flex:0.1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>
      {min}:{sec}
      </Text>
        </View>
    <View style={{flex:1,borderWidth:1,padding:20}}>
      {!!questions.length && 
      <View>
        
      <Text style={{fontSize:20}}>Qno{index+1}: {questions[index].question}</Text>
      <View style={{ margin: 50 }}>
        <RadioButtons
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
        />
      </View>
      </View>
      }

    </View>
    <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
      <Button  disabled={this.state.next} onPress={()=>{this.next()}} title='Next'/>
      {/* <Button onPress={()=>{()=>{this.props.navigation.navigate('Result',{correct:correct,wrong:wrong,index:index})}}} title='Quit Quiz'/> */}
    </View>
    </View>
  )  
}



}  