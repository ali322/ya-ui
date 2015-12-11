'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";

class SliderExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="slider-example">
                <Header title="Slider" backButton={true} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<SliderExample />,document.getElementById('slider-example'));
})