import React, { useEffect } from "react";
import './About.css';
import './App.css';

export default function About() {
    useEffect(()=>{
        // Get the modal
        var modal = document.getElementById("about-modal");

        // Get the button that opens the modal
        var btn = document.getElementById("about-button");

        // Get the <span> element that closes the modal
        var span = document.getElementById("about-close");

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === modal) {
            modal.style.display = "none";
            }
        }
    })

    return <>
        <div id="about-modal" className="modal">
            <div className="modal-content">
                <span className="close" id="about-close">&times;</span>
                Todo list app developed using React.<br />
                Github repository link: <a href="https://github.com/josefmicak/react-apps/tree/main/todo-list" target="_blank" rel="noreferrer">https://github.com/josefmicak/react-apps/tree/main/todo-list</a><br/>
                Icons source link: <a href="https://www.flaticon.com" target="_blank" rel="noreferrer">https://www.flaticon.com</a>
            </div>
        </div>
        <div id="about">
            <button><img className="main-button" id="about-button" src="/info.png" alt="About" border="0" /></button>
        </div>
        </>;
}