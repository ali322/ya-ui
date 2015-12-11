'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";

class MoreExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="more-example">
                <Header title="More" backButton={true} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<MoreExample />,document.getElementById('more-example'));
})