import React, { Component } from 'react'
import Task from './Task';
import Header from './Header';
import About from './About';
import './App.css';
    
//todo: statistics, modal/alert component, download - non-empty, upload - no duplicates
class App extends Component {
  constructor(props){ 
    super(props) 
        
    this.state = {
      taskList : [],
      counter : 0} 
        
    this.addTask = this.addTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.moveTaskUp = this.moveTaskUp.bind(this)
    this.moveTaskDown = this.moveTaskDown.bind(this)
    this.uploadXml = this.uploadXml.bind(this)
    this.displayAlert = this.displayAlert.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
    this.downloadXml = this.downloadXml.bind(this)
  } 

  componentDidMount(){
    this.addTask()
    this.closeAlert()

    // Get the modal
    var modal = document.getElementById("import-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("import-button");

    // Get the <span> element that closes the modal
    var spanModal = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    spanModal.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
        modal.style.display = "none";
        }
    }

    var btn2 = document.getElementById("alert-close");
    btn2.onclick = function() {
      document.getElementById("import-alert").style.display = "none";
  }
  }
    
  addTask(){ 
    var currentCounter = this.state.counter;
    this.setState({taskList : 
      [...this.state.taskList, <Task key={this.state.counter} taskNumber={this.state.counter} content="" onRemoveButtonClick={() => this.removeTask(currentCounter)}
        onMoveUpButtonClick={() => this.moveTaskUp(currentCounter)} onMoveDownButtonClick={() => this.moveTaskDown(currentCounter)}/>]}) 
    this.setState({counter : this.state.counter + 1})
  } 

  removeTask(key){
    this.setState({taskList : this.state.taskList.filter(item => item.key !== key.toString())})
  }

  moveTaskUp(key){
    var taskArray = this.state.taskList;
    var index = taskArray.findIndex(item => item.key === key.toString());
    if(index > 0){
      var previousElementKey = taskArray[index-1].key;
      var previousElementContent = document.getElementById("task-text-" + previousElementKey).value;
      document.getElementById("task-text-" + previousElementKey).value = document.getElementById("task-text-" + key).value;
      document.getElementById("task-text-" + key).value = previousElementContent;
      //[taskArray[index-1], taskArray[index]] = [taskArray[index], taskArray[index-1]];
      this.setState({taskList : taskArray})
    }
  }

  moveTaskDown(key){
    var taskArray = this.state.taskList;
    var index = taskArray.findIndex(item => item.key === key.toString());
    if(index < taskArray.length - 1){
      var nextElementKey = taskArray[index+1].key;
      var nextElementContent = document.getElementById("task-text-" + nextElementKey).value;
      document.getElementById("task-text-" + nextElementKey).value = document.getElementById("task-text-" + key).value;
      document.getElementById("task-text-" + key).value = nextElementContent;
      //[taskArray[index-1], taskArray[index]] = [taskArray[index], taskArray[index-1]];
      this.setState({taskList : taskArray})
    }
  }

  uploadXml(event){
    var xmlContent = "";
    var fileReader=new FileReader();
    var text, color = "";
    fileReader.onload = () => {
      xmlContent = (fileReader.result);

      var parser, xmlDoc;
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlContent,"text/xml");
      var xmlElements = xmlDoc.getElementsByTagName("content");
      var numberToEdit = this.state.counter;
      var tasksToAdd = [];
      for(var i = 0; i < xmlElements.length; i++){
        tasksToAdd.push(<Task key={this.state.counter} taskNumber={this.state.counter} content={xmlElements[i].textContent} onRemoveButtonClick={() => this.removeTask(numberToEdit)}
        onMoveUpButtonClick={() => this.moveTaskUp(numberToEdit)} onMoveDownButtonClick={() => this.moveTaskDown(numberToEdit)}/>);
        numberToEdit += 1;
      }
      this.setState({taskList : this.state.taskList.concat(tasksToAdd)})
      this.setState({counter : this.state.counter + tasksToAdd.length})

      if(xmlElements.length > 0){
        text = "Successfully uploaded " + xmlElements.length + " task(s).";
        color = "#04AA6D";
      }
      else{
        text = "Failed to find any tasks to upload. Please try again.";
        color = "#ff9800";
      }
      this.displayAlert(text, color);
    }
    fileReader.readAsText(event.target.files[0]);
    var modal = document.getElementById("import-modal");
    modal.style.display = "none";
  }

  displayAlert(text, color){
    document.getElementById("import-alert").style.display = "block";
    document.getElementById("import-alert-content").textContent = text;
    document.getElementById("import-alert").style.backgroundColor = color;
  }

  closeAlert(){
    document.getElementById("import-alert").style.display = "none";
  }

  downloadXml(){
    var xmltext = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    var taskInputs = document.getElementsByClassName("task-text");
    for(var i = 0; i < taskInputs.length; i++){
      xmltext += "<task>\n\t<content>" + taskInputs[i].value + "</content>\n</task>\n"
    }

    var currentdate = new Date(); 
    var fileName = "tasks-" + new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString().substring(0, 19).replace(/[.:]/g, "-") + ".xml";
    var pom = document.createElement('a');
    var bb = new Blob([xmltext], {type: 'text/xml'});

    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', fileName);

    pom.dataset.downloadurl = ['text/xml', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.classList.add('dragout');

    pom.click();
  }

  render(){ 
    return ( 
      <>
        <div id="import-modal" className="modal">
          <div className="modal-content">
              <div className="close">&times;</div>
              Upload .xml file with saved tasks.<br/>
              <input type="file" id="file-selector" onChange={(event)=> { this.uploadXml(event) }}/>
          </div>
        </div>

        <div id="import-alert" className="alert">
            <div id="alert-close">&times;</div>
            <div id="import-alert-content"></div>
        </div>

        <Header />
        <About />
        <div id="task-list">
          <h1>Task list</h1>   
          {this.state.taskList}

          <button onClick={this.addTask}><img className="main-button" src="/plus.png" alt="Add task" border="0" /></button>
          <button><img className="main-button" id="import-button" src="/upload.png" alt="Upload tasks" border="0" /></button>
          <button onClick={this.downloadXml}><img className="main-button" id="download-button" src="/download.png" alt="Download tasks" border="0" /></button>
        </div> 
      </>
    ) 
  } 
} 
    
export default App;