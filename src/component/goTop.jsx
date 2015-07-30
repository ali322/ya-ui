'use strict'
let React = require('react/addons'),
    Event = require('../util/event'),
    Dom = require("../util/dom"),
    _ = require('lodash');

let GoTop = React.createClass({
    getInitialState(){
        return {
            active:false
        }
    },
    updateVisible(){
        var scrollTop = Dom.scrollTop(window);
        if(scrollTop > 50){
            this.setState({active:true});
        }else{
            this.setState({active:false});
        }
    },
    componentDidMount(){
        Event.bind(window,'scroll',_.debounce(this.updateVisible,100));
    },
    componentWillUnmount(){
        Event.unbind(window,'scroll',_.debounce(this.updateVisible,100));
    },
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
    },
    render(){
        var classes = React.addons.classSet({
            "back-to-top":true,
            "active":this.state.active
        });
        return (
            <div className={classes}>
                <a href={null} onClick={this.backToTop}><span className="icon iconfont icon-top"></span></a>
            </div>
        );
    }
});

module.exports = GoTop;