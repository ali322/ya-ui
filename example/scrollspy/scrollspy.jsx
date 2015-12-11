'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";

class ScrollspyExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="scrollspy-example">
                <Header title="ScrollSpy" backButton={true} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<ScrollspyExample />,document.getElementById('scrollspy-example'));
})