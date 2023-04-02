import React, { useEffect } from "react";
import './Task.css';

export default function Task({taskNumber, onRemoveButtonClick}) {
    const editTextButtonId = "edit-text-button-" + taskNumber;
    const saveTextButtonId = "save-text-button-" + taskNumber;
    const removeTextButtonId = "remove-text-button-" + taskNumber;
    const taskTextId = "task-text-" + taskNumber;
    useEffect(()=>{
        document.getElementById(saveTextButtonId).disabled = true;
    })

    return <div>
        <input type="text" readOnly className="task-text" id={taskTextId} placeholder="Add task text here..."/>
        <button id={editTextButtonId} onClick={editTaskText}>Edit</button>
        <button id={saveTextButtonId} onClick={saveTaskText}>Save</button>
        <button id={removeTextButtonId} onClick={onRemoveButtonClick}>Remove</button> 
        </div>;

    function editTaskText(){
        document.getElementById(taskTextId).readOnly = false;
        document.getElementById(saveTextButtonId).disabled = false;
    }

    function saveTaskText(){
        document.getElementById(saveTextButtonId).disabled = true;
    }
}

