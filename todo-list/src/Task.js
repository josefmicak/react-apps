import React, { useEffect } from "react";
import './Task.css';

export default function Task({taskNumber, content, onRemoveButtonClick, onMoveUpButtonClick, onMoveDownButtonClick}) {
    const editTextButtonId = "edit-text-button-" + taskNumber;
    const saveTextButtonId = "save-text-button-" + taskNumber;
    const removeTextButtonId = "remove-text-button-" + taskNumber;
    const taskTextId = "task-text-" + taskNumber;
    useEffect(()=>{
        document.getElementById(saveTextButtonId).disabled = true;
        document.getElementById(taskTextId).value = content;
    })

    return <>
        <div className="task">
            <p className="task-row">
                <input type="text" readOnly className="task-text" id={taskTextId} placeholder="Add task text here..."/>
                <button id={editTextButtonId} onClick={editTaskText}><img src="/edit.png" className="task-icon" alt="Edit task" border="0"/></button>
                <button id={saveTextButtonId} onClick={saveTaskText}><img src="/finish.png" className="task-icon" alt="Save task" border="0" /></button>
                <button onClick={onMoveUpButtonClick}><img src="/up-arrow.png" className="task-icon" alt="Move task up" border="0" /></button>
                <button onClick={onMoveDownButtonClick}><img src="/down-arrow.png" className="task-icon" alt="Move task down" border="0" /></button>
                <button id={removeTextButtonId} onClick={onRemoveButtonClick}><img src="/remove.png" className="task-icon" alt="Remove task" border="0" /></button>
            </p>
        </div>
        </>;

    function editTaskText(){
        document.getElementById(taskTextId).readOnly = false;
        document.getElementById(taskTextId).focus();
        document.getElementById(saveTextButtonId).disabled = false;
    }

    function saveTaskText(){
        document.getElementById(saveTextButtonId).disabled = true;
    }
}