'use strict'
import React from "react";
import classNames from "classnames";
import dom from "../lib/dom.es6";

class GoTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {active:false};
    }
    updateVisible(){
        var scrollTop = dom.scrollTop(window);
        if(scrollTop > 50){
            this.setState({active:true});
        }else{
            this.setState({active:false});
        }
    }
    componentDidMount(){
        Event.bindEvent(window,'scroll',_.debounce(this.updateVisible.bind(this),100));
    }
    componentWillUnmount(){
        Event.unbindEvent(window,'scroll',_.debounce(this.updateVisible.bind(this),100));
    }
    backToTop(){
        var smoothScroll = function(){
            var scrollTop = dom.scrollTop(window);
            if(scrollTop <= 0){
                clearInterval(tickTock);
            }
            dom.scrollTop(window,scrollTop/1.1);
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
