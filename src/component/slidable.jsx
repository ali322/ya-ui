'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import dom from "../lib/dom.es6";
import rAF from "../lib/dom/requestAnimationFrame";
import _ from "lodash"

class Slidable extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
        }
        this.translateX = 0;
        this.translateY = 0;
    }
    handleTouchStart(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchX = clientX;
        this.startTouchY = clientY;
        this.lastY = this.startTouchY;
        this.lastX = this.startTouchX;
    }
    handleTouchEnd(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            // return;
        }
        const {axis} = this.props;
        let itemNode = ReactDOM.findDOMNode(this).firstChild
        if(axis === "y"){
            let itemHeight = itemNode.offsetHeight;
            let step = Math.abs(this.translateY) / itemHeight > 0.5 ? 1:0
            if(this.lastY !== this.startTouchY && step !== this.state.activeIndex){
                this.setState({
                    activeIndex:step
                },()=>this.props.touchEnd(step))
            }
        }else if(axis === "x"){
            let itemWidth = itemNode.offsetWidth;
            let step = Math.abs(this.translateX) / itemWidth > 0.5 ? 1:0
            if(this.lastX !== this.startTouchX && step !== this.state.activeIndex){
                this.setState({
                    activeIndex:step
                },()=>this.props.touchEnd(step))
            }
        }
        // this.endTouchY = clientY;
        // this.endTouchX = clientX;
        // console.log('offsetY',this.offsetY,this.translateY,"offsetX",this.offsetX)

    }
    handleTouchMove(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            // return;
        }
        this.translateY += (clientY - this.lastY)
        this.translateX += (clientX - this.lastX)

        this.translateY = this.translateY >= 0 ? 0 : this.translateY;
        this.translateX = this.translateX >= 0 ? 0 : this.translateX;
        if(this.edgeChecked() === false){
            // _.delay(()=>{
            rAF(this.transitionTouch.bind(this))
            this.lastY = clientY;
            this.lastX = clientX;
            // },10)
        }
        // console.log("translateY",this.translateY,"lastY",this.lastY,"clientY",clientY)
    }
    edgeChecked(){
        const {axis} = this.props;
        let {translateY,translateX} = this
        let translateNode = ReactDOM.findDOMNode(this);
        // let beyondY = dom.offset(translateNode.parentNode).top - dom.offset(translateNode).top; 
        // let beyondX = dom.offset(translateNode.parentNode).left - dom.offset(translateNode).left; 
        let maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.parentNode.offsetHeight;
        let maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.parentNode.offsetWidth;

        // console.log('translateY',translateY,"maxBeyondY",maxBeyondY)
        if(maxBeyondY <= (- this.translateY) && axis === "y"){
            this.translateY = - maxBeyondY
            return true
        }else if(maxBeyondX <= (- this.translateX) && axis === "x"){
            this.translateX = - maxBeyondX
            return true
        }
        return false
    }
    transitionTouch(){
        const {axis} = this.props;
        let {translateY,translateX} = this
        var transform = null;
        if(axis === "y" && translateY !== 0){
            translateY = window.px2rem ? window.px2rem(translateY) + "rem": `${translateY}px`;
            transform = `translate3D(0,${translateY},0)`;
        }else if(axis === "x" && translateX !== 0){
            translateX = window.px2rem ? window.px2rem(translateX) + "rem" : `${translateX}px`;
            transform = `translate3D(${translateX},0,0)`;
        }
        if(transform !==null){
            let translateNode = ReactDOM.findDOMNode(this);
            // _.delay(()=>{
            translateNode.style.transitionDuration =".3s"
            translateNode.style.transform = transform;
            // },60)
        }
    }
    render(){
        let child = React.Children.only(this.props.children);
        console.log('activeIndex',this.state.activeIndex)
        return React.cloneElement(child,Object.assign({},child.props,{
            onTouchStart:this.handleTouchStart.bind(this),
            onTouchMove:this.handleTouchMove.bind(this),
            onTouchEnd:this.handleTouchEnd.bind(this),
            active:this.state.activeIndex
        }))
    }
}

Slidable.defaultProps = {
    axis:"y",
    touchEnd:()=>{}
}

export default Slidable;