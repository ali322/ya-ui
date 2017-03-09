'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import Checkbox from "../../src/component/form/checkbox.jsx";
import Radio from "../../src/component/form/radio.jsx";

class FormExample extends Component{
    constructor(props){
        super(props);
        this.state = {
            sex:"male",
            habits:[]
        }
    }
    handleRadioChange(value,e){
        this.setState({
            sex:value,
        })
    }
    handleCheckboxChange(value,checked,e){
        let {habits} = this.state;
        if(habits.indexOf(value) === -1){
            habits.push(value)
        }else{
            habits.splice(habits.indexOf(value))
        }
        this.setState({
            habits
        })
    }
    render(){
        return (
            <div className="form-example">
                <Header title="Form" backButton={true} />
                <div className="form-row">
                    <label>Checkbox</label>
                    <div className="form-row-radio">
                        <Checkbox 
                        onChange={this.handleCheckboxChange.bind(this,"Book")}/>
                        <b>Book</b>
                        <Checkbox 
                        onChange={this.handleCheckboxChange.bind(this,"Game")}/>
                        <b>Game</b>
                    </div>
                </div>
                <div className="form-row">
                    <label>Radio</label>
                    <div className="form-row-radio">
                        <Radio name="sex" checked={true} onChange={this.handleRadioChange.bind(this,"male")}/>
                        <b>male</b>
                        <Radio name="sex" onChange={this.handleRadioChange.bind(this,"female")}/>
                        <b>female</b>
                    </div>
                </div>
                <div className="md-card">
                <h3>Result</h3>
                <p>Sex<b>{this.state.sex}</b></p>
                <p>Habits<b>{this.state.habits.join(",")}</b></p>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<FormExample />,document.getElementById('form-example'));
})