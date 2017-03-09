'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import {Accordion,AccordionItem} from "../../src/component/accordion.jsx";

class AccordionExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="accordion-example">
                <Header title="Accordion" backButton={true} />
                <div className="accordion-example-inner">
                <Accordion>
                <AccordionItem title="Section 1">this is section 1</AccordionItem>
                <AccordionItem title="Section 2">this is section 2</AccordionItem>
                <AccordionItem title="Section 3">this is section 3</AccordionItem>
                </Accordion>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<AccordionExample />,document.getElementById('accordion-example'));
})