import React, { Component } from 'react'
import Task from './Task';
import Header from './Header';
import About from './About';
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

  componentDidMount(){
    this.addTask()
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
      <>
      <Header />
      
        <div id="task-list">
          <h1>Task list</h1>   
          {this.state.taskList}

          <button onClick={this.addTask}><img className="main-button" src="/plus.png" alt="Add task" border="0" /></button>
        </div> 
        <About />
      </>
    ) 
  } 
} 
    
export default App;