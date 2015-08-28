'use strict'
import React from "react";
import classNames from "classnames";
import Dom from "../util/dom";

class GoTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {active:false};
    }
    updateVisible(){
        var scrollTop = Dom.scrollTop(window);
        if(scrollTop > 50){
            this.setState({active:true});
        }else{
            this.setState({active:false});
        }
    }
    componentDidMount(){
        Event.bindEvent(window,'scroll',_.debounce(this.updateVisible,100));
    }
    componentWillUnmount(){
        Event.unbindEvent(window,'scroll',_.debounce(this.updateVisible,100));
    }
    backToTop(){
        var smoothScroll = function(){
            var scrollTop = Dom.scrollTop(window);
            if(scrollTop <= 0){
                clearInterval(tickTock);
            }
            Dom.scrollTop(window,scrollTop/1.1);
        }
        var tickTock = setInterval(smoothScroll,10)
        // console.log(scrollFunc);
    }
    render(){
        var classes = classNames({
            "back-to-top":true,
            "active":this.state.active
        });
        return (
            <div className={classes}>
                <a href={null} onClick={this.backToTop}><span className="icon iconfont icon-top"></span></a>
            </div>
        );
    }
}

export default GoTop;
