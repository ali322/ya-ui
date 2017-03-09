'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import Selected from "../../src/component/selected/selected.jsx";
import SelectedSlide from "../../src/component/selected/selectedslide.jsx";

let SelectedForm = React.createClass({
    render(){
        const options = [
            {label:'option 1',value:1},
            {label:'option 2',value:2}
        ];
        return (
            <div className="selected-example">
                <Header title="Selected" backButton={true} />
                <div className="form-row">
                    <label>Selected</label>
                    <Selected options={options}/>
                </div>
                <div className="form-row">
                    <label>SelectedSlider</label>
                    <SelectedSlide options={options}/>
                </div>
            </div>
        );
    }
});

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<SelectedForm />,document.getElementById('selected-example'));
})