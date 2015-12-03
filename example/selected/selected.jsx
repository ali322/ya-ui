'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import {component} from "../../src/index.es6";
let {Selected,SelectedSlide} = component;

let SelectedForm = React.createClass({
    render(){
        const options = [
            {label:'option 1',value:1},
            {label:'option 2',value:2}
        ];
        return (
            <div className="selected-example">
                <div className="form-row">
                    <label>Selected:</label>
                    <Selected options={options}/>
                </div>
                <div className="form-row">
                    <label>SelectedSlider:</label>
                    <SelectedSlide options={options}/>
                </div>
            </div>
        );
    }
});

document.addEventListener('DOMContentLoaded',()=>{
    ReactDOM.render(<SelectedForm />,document.getElementById('selected-example'));
})