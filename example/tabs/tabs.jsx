'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";

class TabsExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="tabs-example">
                <Header title="Tabs" backButton={true} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<TabsExample />,document.getElementById('tabs-example'));
})