'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../core/icon.jsx";
import dom from "../../lib/dom.es6";
import util from "../../lib/util.es6";

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }
    componentDidMount(){
        this.bindOuterEvent();
    }
    componentWillUnmount(){
        this.unbindOuterEvent();
    }
    setDropdownState(state){
        if(state === true){
            this.bindOuterEvent();
        }else{
            this.unbindOuterEvent();
        }
        this.setState({
            open:state
        },()=>{
            state && this.props.onOpen && this.props.onOpen();
            !state && this.props.onClose && this.props.onClose();
        })
    }
    bindOuterEvent(){
        util.bindEvent(document,this.handleOuterClick.bind(this));
        util.bindEvent(document,this.handleKeyup.bind(this));
    }
    unbindOuterEvent(){
        util.unbindEvent(document,this.handleOuterClick.bind(this));
        util.unbindEvent(document,this.handleKeyup.bind(this));
    }
    handleKeyup(){
        e && e.keyCode === 27 && this.setDropdownState(false);
    }
    handleOuterClick(){
        if(dom.hasNode(e.target,React.findDOMNode(this)) === true){
            return false;
        }
        this.setDropdownState(false);
    }
    handleClick(e){
        e && e.preventDefault();
        this.setDropdownState(!this.state.open);
    }
    render(){
        const dropdownClasses = classNames(this.props.className,{
            "dropdown":true,
            active:this.state.open
        });
        const caret = (<Icon 
            icon={this.state.open?"up-open":"down-open"}/>);
        const contentClasses = classNames({
            "dropdown-content":true,
            active:this.state.open
        });
        const {maxHeight,minWidth} = this.props;
        const btnStyle = {
            width:minWidth
        };
        const contentStyle = {
            maxHeight
        };
        return (
            <div className={dropdownClasses}>
            <button onClick={this.handleClick.bind(this)} style={btnStyle} ref="dropdownTrigger">
            <span className="dropdown-status">{this.props.title}</span>{caret}
            </button>
            <div ref="dropdownContent" className={contentClasses} style={contentStyle}>
            {this.props.children}
            </div>
            </div>
        )
    }
}

export default Dropdown;