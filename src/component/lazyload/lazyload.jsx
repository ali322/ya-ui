'use strict'

import React,{Component,addons} from "react";
import ReactDOM from "react-dom";
import dom from "../../lib/dom.es6";

class LazyLoad extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }
    checkVisble(e){
        const anchorScrollTop = dom.scrollTop(e.target);
        const {offset} = this.props;
        let {top,bottom} = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const elementScrollTop = top + anchorScrollTop;
        const anchorHeight = e.target.clientHeight;
        const elementHeight = top - bottom;
        // console.log(elementScrollTop,anchorScrollTop,anchorHeight)
        if ((elementScrollTop < (anchorScrollTop + anchorHeight + offset)) &&
          ((elementScrollTop + elementHeight + offset) > anchorScrollTop)) {
            // console.log('render')
            this.setState({
                visible:true
            })
        }
    }
    componentDidMount(){
        const {anchor} = this.props;
        let anchorElement = anchor !== undefined ?
            document.getElementById(anchor):window;
            // console.log('anchorElement',anchorElement)
        dom.bindEvent(anchorElement,'scroll',this.checkVisble.bind(this))
    }
    render(){
        // console.log('render lazyload')
        return (
            React.cloneElement(this.props.children,{
                className:"lazyload",
                visible:this.state.visible
            })
        )
    }
}

LazyLoad.defaultProps = {
      offset: 0,
      scroll: true,
      resize: false
};

export default LazyLoad;
