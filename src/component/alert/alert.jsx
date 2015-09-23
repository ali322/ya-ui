'use strict'
import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../lib/dom.es6";

class Alert extends Component{
    render(){
        const classes = classNames("alert",{
            "active":this.props.active
        })
        return (
            <div className={classes}>
            {this.props.children}
            </div>
        );
    }
}

Alert.defaultProps = {
    autoHide:true,
    delay:3000
}

export default Alert;