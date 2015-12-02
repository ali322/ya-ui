'use strict';
import React,{Component} from "react";
import ReactDOM from "react-dom";

class IndexExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="index-content">
                <ul>
                    <li><a href="./selected/selected.html">Selected</a></li>
                    <li><a href="./dialog/dialog.html">Dialog</a></li>
                </ul>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    ReactDOM.render(<IndexExample />,document.getElementById('example'));
})