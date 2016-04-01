'use strict'
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom.es6";
import SmoothScroll from "../lib/dom/smoothscroll.es6";

class Refresher extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.scrollNode = ReactDOM.findDOMNode(this).parentNode
        dom.bindEvent(this.scrollNode,"scroll",this.handleScroll.bind(this))
    }
    componentWillUnmount(){
        dom.unbindEvent(this.scrollNode,"scroll",(e)=>{
            this.handleScroll(this.scrollNode)
        })
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