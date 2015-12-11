'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";

class StickyExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="sticky-example">
                <Header title="Sticky" backButton={true} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<StickyExample />,document.getElementById('sticky-example'));
})