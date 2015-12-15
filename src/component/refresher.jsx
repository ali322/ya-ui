'use strict'
import React from "react";
import classNames from "classnames";
import Icon from "./icon.jsx";

class Refresher extends React.Component{
    render(){
        var classes = classNames({
            "refresher":true,
            "refresher-active":this.props.active
        })
        return (
            <div className={classes}>
                <Icon icon="spin-5" className="animate-spin"/>Loading
            </div>
        );
    }
}

export default Refresher;