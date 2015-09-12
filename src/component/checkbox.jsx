'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Icon from "./core/icon.jsx";

class Checkbox extends Component{
    render(){
        const {type,name,checked} = this.props;
        var checkedIcon = "check",uncheckIcon = "check-empty";
        var checkInput = (
            <input type="checkbox" defaultChecked={checked}/>
        );
        if(type === "radio"){
            checkedIcon = "dot-circled";
            uncheckIcon = "circle-empty";
            checkInput = (<input type="radio" name={name} defaultChecked={checked}/>);
        }
        checkedIcon = this.props.checkedIcon ? this.props.checkedIcon:checkedIcon;
        uncheckIcon = this.props.uncheckIcon ? this.props.uncheckIcon:uncheckIcon
        return (
            <div className="checkbox">
            {checkInput}
            <Icon icon={checkedIcon} className="checked"/>
            <Icon icon={uncheckIcon} className="unchecked"/>
            </div>
        )
    }
}

Checkbox.defaultProps = {
    type:"checkbox"
}

export default Checkbox;