'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "../core/icon.jsx";

class Checkbox extends Component{
    componentDidUpdate(prevProps,prevState){
        if(this.props.checked === false && prevProps.checked === true){
            React.findDOMNode(this.refs.checkInput).checked = false; 
        }
    }
    render(){
        const {type,name,checked,onChange} = this.props;
        var checkedIcon = "check",uncheckIcon = "check-empty";
        var checkInput = (
            <input type="checkbox" onChange={onChange} ref="checkInput" defaultChecked={checked}/>
        );
        if(type === "radio"){
            checkedIcon = "dot-circled";
            uncheckIcon = "circle-empty";
            checkInput = (<input type="radio" name={name} onChange={onChange} defaultChecked={checked} 
            ref="checkInput"/>);
        }
        checkedIcon = this.props.checkedIcon ? this.props.checkedIcon:checkedIcon;
        uncheckIcon = this.props.uncheckIcon ? this.props.uncheckIcon:uncheckIcon;
        const classes = classNames("checkbox",this.props.className);
        return (
            <div className={classes}>
            {checkInput}
            <Icon icon={checkedIcon} className="checked"/>
            <Icon icon={uncheckIcon} className="unchecked"/>
            </div>
        )
    }
}

Checkbox.defaultProps = {
    type:"checkbox",
    onChange:function(){}
}

export default Checkbox;