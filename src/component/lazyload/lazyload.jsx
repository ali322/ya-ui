'use strict'
import React,{Component} from "react";
import ReactDOM from "react-dom";
import dom from "../../lib/dom";

const listeners = [];

function checkVisble(component){
    let checkNode = ReactDOM.findDOMNode(component)
    let {top,bottom} = checkNode.getBoundingClientRect();
    let scrollTop = dom.scrollTop(component.scrollNode);

    let elementTop = top + scrollTop;
    let elementHeight = bottom - top;
    let containerHeight = window.innerHeight || document.documentElement.clientHeight;
    if(component.props.relative){
        containerHeight = component.scrollNode.clientHeight
    }
    // console.log(containerHeight,scrollTop,elementTop)
    if(elementTop < (scrollTop + containerHeight + component.props.offset)){
    // if ((elementTop < (scrollTop + containerHeight + component.props.offset)) &&
    //       ((elementTop + elementHeight + component.props.offset) > scrollTop)) {
        component.setState({
            visible:true
        });
    }
}

function lazyLoadHandler(){
    listeners.forEach((listener)=>{
        checkVisble(listener);
    })
}

class LazyLoad extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }
    componentDidMount(){
        this.scrollNode = window
        if(this.props.relative){
            this.scrollNode = dom.closet(ReactDOM.findDOMNode(this),this.props.relativeSelector)
        }
        listeners.push(this);
        checkVisble(this);
        dom.bindEvent(this.scrollNode,'scroll',lazyLoadHandler)
    }
    componentWillUnmount(){
        const index = listeners.indexOf(this);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
    }
    render(){
        return (
            React.cloneElement(this.props.children,{
                visible:this.state.visible
            })
        )
    }
}

LazyLoad.defaultProps = {
      offset: 100,
      smooth:true,
      relative: true,
      relativeSelector:"",
      resize: false
};

export default LazyLoad;