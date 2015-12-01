'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import {component} from "../../src/index.es6";
let {Selected} = component;

let SelectedForm = React.createClass({
    render(){
        const options = [
            {label:'option 1',value:1},
            {label:'option 2',value:2}
        ];
        return (
            <form action="">
            <div className="form-row">
                <label>choose:</label>
                <Selected options={options}/>
            </div>
            </form>
        );
    }
});

document.addEventListener('DOMContentLoaded',()=>{
    ReactDOM.render(<SelectedForm />,document.getElementById('selected'));
})