'use strict';
import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import {component} from "../../src/index.es6";
let {DatetimeInput} = component;

class DatetimepickerExample extends Component{
    render(){
        return (
            <div className="datetimepicker-example">
            <Header title="DatetimePicker" backButton={true}/>
            <div className="form-row">
                    <label>Numberpicker</label>
                    <div className="form-row-numberpicker">
                    <DatetimeInput value={Date.now()}/>
                    </div>
            </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<DatetimepickerExample />,document.getElementById("datetimepicker-example"));
})