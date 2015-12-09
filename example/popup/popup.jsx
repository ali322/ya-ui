'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import {component} from "../../src/index.es6";
let {Popup} = component;

class PopupExample extends Component{
    constructor(props){
        super(props);
        this.state = {
            leftActive:false,
            rightActive:false,
            bottomActive:false
        }
    }
    toggleLeft(e){
        e && e.stopPropagation()
        this.hideAll()
        this.setState({
            leftActive:!this.state.leftActive
        });
    }
    toggleRight(e){
        e && e.stopPropagation()
        this.hideAll()
        this.setState({
            rightActive:!this.state.rightActive
        });
    }
    toggleBottom(e){
        e && e.stopPropagation()
        this.hideAll()
        this.setState({
            bottomActive:!this.state.bottomActive
        });
    }
    hideAll(e){
        e && e.preventDefault()
        this.setState({
            leftActive:false,
            rightActive:false,
            bottomActive:false
        })
    }
    render(){
        const {leftActive,rightActive,bottomActive} = this.state;
        return (
            <div className="popup-example" onClick={this.hideAll.bind(this)}>
            <Header title="Popup" backButton={true} />
            <div className="popup-bottons">
                <button onClick={this.toggleLeft.bind(this)} className="md-button">Popup Left</button>
                <button onClick={this.toggleRight.bind(this)} className="md-button">Popup Right</button>
                <button onClick={this.toggleBottom.bind(this)} className="md-button">Popup Bottom</button>
            </div>
            <Popup active={leftActive} direction="left">
                <div className="md-card">
                <h3 className="md-h3">Title</h3>
                <p>Popup Content</p>
                </div>
            </Popup>
            <Popup active={rightActive} direction="right">
                <div className="md-card">
                <h3 className="md-h3">Title</h3>
                <p>Popup Content</p>
                </div>
            </Popup>
            <Popup active={bottomActive} direction="bottom">
                <div className="md-card">
                <h3 className="md-h3">Title</h3>
                <p>Popup Content</p>
                </div>
            </Popup>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    ReactDOM.render(<PopupExample />,document.getElementById("popup-example"));
})

