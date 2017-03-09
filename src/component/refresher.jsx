'use strict'
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom";
import SmoothScroll from "../lib/dom/smoothscroll";

class Refresher extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var classes = classNames({
            "refresher":true,
            "refresher-active":this.props.active
        })
        return (
            <div className={classes}>
                <span className="iconfont icon-loading animate-spin"></span>正在加载
            </div>
        );
    }
}

Refresher.defaultProps = {
    smooth:false,
    active:false,
    threshold:10
}

export default Refresher;