'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import Sticky from "../../src/component/sticky.jsx";

class StickyExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="sticky-example">
                <Header title="Sticky" backButton={true} />
                <Sticky bottom="0">
                <div className="sticky-bottom">im bottom</div>
                </Sticky>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<StickyExample />,document.getElementById('sticky-example'));
})