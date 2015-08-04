'use strict'
var React = require("react");

import {component,action} from "../../src/index";
let {Dialog} = component;
let {dialogAction} = action;

React.createClass({
    popup(){
        dialogAction.popup('title','dialog content','confirm','cancel')
    },
    render(){
        return (
            <div className="dialog-example">
            <button onClick={this.popup}>Open Dialog</button>
            <Dialog />
            </div>
        );
    }
})