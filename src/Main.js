//hello this is a test
import * as React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import   Constants   from "expo-constants";
import {StatusBar} from 'react-native'; 
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from './components/Header'; 
import {styles as GlobalStyles} from './utils/styles'; 
import Todos from './components/Todos/Todos'; 


import { Card } from "react-native-paper";

export default class App extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      todo: '', 
      loading: true, 
      todos: [],
    }

  }
  
  addTodo = () => {
    if(this.state.todo.length === 0){
      this.setState({inputError: true}); 
      return; 
    }

    const todos = this.state.todos; 
    const todo = { 
      title: this.state.todo, 
      completed: false, 
      createdOn: Date.now(), 
      notes: '', 
      dueDate: null, 
      remindMe: false, 
      completedOn: null, 
    }
    todos.push(todo); 
    this.setState({todos, todo: ''}); 
  }

  checkBoxToggle = (i) => {
    const todos = this.state.todos; 
    const todo = todos[i]; 
    todo.completed = !todo.completed; 
    todo.completedOn = todo.completed ? Date.now() : null; 
    todos[i] = todo; 
    this.setState({todos}); 

  }

  onDeleteAction = (i) => {
    const todos = this.state.todos; 
    todos.splice(i,1); 
    this.setState({todos}); 
  }



  render(){
    return(
      <LinearGradient style = {{flex:1}} colors={GlobalStyles.appBackgroundColors}>
        <StatusBar barStyle='light-content'/>
        <Header title='Tudus app'/>
        <View style={styles.container}>
          <TextInput
            style={styles.texInput}
            autoCapitalize='sentences'
            placeholder='What do you wanna get done?'
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            onChangeText={todo => this.setState({ todo })}
            blurOnSubmit={false}
            onSubmitEditing={this.addTodo}
            value={this.state.todo}
          />
          <View style = { styles.todosWrp}>
            <View style = { styles.listHeaderWrp}>
              <Text style = { styles.listHeader}>Your Todos</Text>

            </View>
            <ScrollView>
              <Todos
                todos = { this.state.todos}
                checkBoxToggle = {this.checkBoxToggle}
                onDelete = {this.onDeleteAction}

              />
            </ScrollView>

          </View>
          
        </View>
      </LinearGradient>

    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:5, 
       
    }, 
    texInput:{
      color: GlobalStyles.fontColor, 
      fontSize: 28, 
      fontStyle: 'normal'
    }, 

    noTodo:{
      fontSize: GlobalStyles.fontSize, 
      color: GlobalStyles.fontColor, 
      fontWeight: 'bold'
    }

}); 
