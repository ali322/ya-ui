'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";

class AccordionExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="accordion-example">
                <Header title="Accordion" backButton={true} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<AccordionExample />,document.getElementById('accordion-example'));
})