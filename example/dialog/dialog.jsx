'use strict'
import React from "react";
import {component} from "../../src/index";
let {Dialog} = component;

class DialogExample extends React.Component{
    constructor(props){
        super(props);
        this.state({
            popupActive:false
        })
    }
    togglePopup(){
        this.setState({
            popupActive:!this.state.popupActive
        });
    }
    render(){
        return (
            <div className="dialog-example">
            <button onClick={this.togglePopup}>Open Dialog</button>
            <Dialog />
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    React.render(<DialogExample />,document.getElementById(dialog));
})

