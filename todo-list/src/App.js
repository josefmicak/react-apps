import React, { Component } from 'react'
import Task from './Task';
import './App.css';
    
class App extends Component { 
  constructor(props){ 
    super(props) 
        
    this.state = {
      taskList : [],
      counter : 0} 
        
    this.addTask = this.addTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
  } 
    
  addTask(){ 
    var currentCounter = this.state.counter;
    this.setState({taskList : 
      [...this.state.taskList, <Task key={this.state.counter} taskNumber={this.state.counter} onRemoveButtonClick={() => this.removeTask(currentCounter)}/>]}) 
    this.setState({counter : this.state.counter + 1})
  } 

  removeTask(key){
    this.setState({taskList : this.state.taskList.filter(item => item.key !== key.toString())})
  }
      
  render(){ 
    return ( 
      <div id="task-list"> 
       <h2>Task list</h2>   
       <p>{this.state.taskList}</p>
      
        <button onClick={this.addTask}> 
          Add task
        </button> 
      </div> 
    ) 
  } 
} 
    
export default App;