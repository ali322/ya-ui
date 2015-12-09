'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import Numberpicker from "../../src/component/numberpicker.jsx";

class NumberpickerExample extends Component{
    render(){
        return (
            <div className="numberpicker-example">
                <Header title="Numberpicker" backButton={true} />
                <div className="form-row">
                    <label>Numberpicker</label>
                    <div className="form-row-numberpicker">
                    <Numberpicker />
                    </div>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    ReactDOM.render(<NumberpickerExample />,document.getElementById("numberpicker-example"));
})
