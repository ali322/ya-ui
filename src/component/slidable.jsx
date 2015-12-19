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
        this.props.touchEnd();
        this.endTouchY = clientY;
        this.endTouchX = clientX;
        this.offsetY = this.endTouchY - this.startTouchY;
        this.offsetX = this.endTouchX - this.startTouchX;
        // console.log('touchEnd')
        this.lastY = null
        this.lastX = null
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

        const {axis} = this.props;
        this.translateY = this.translateY >= 0 ? 0 : this.translateY;
        this.translateX = this.translateX >= 0 ? 0 : this.translateX;
        if(this.edgeChecked() === false){
            // _.delay(()=>{
            rAF(this.transitionTouch.bind(this))
            // },10)
        }
        // console.log("translateY",this.translateY,"lastY",this.lastY,"clientY",clientY)
        this.lastY = clientY;
        this.lastX = clientX;
    }
    edgeChecked(){
        const {axis} = this.props;
        let {translateY,translateX} = this
        let translateNode = ReactDOM.findDOMNode(this);
        // let beyondY = dom.offset(translateNode.parentNode).top - dom.offset(translateNode).top; 
        // let beyondX = dom.offset(translateNode.parentNode).left - dom.offset(translateNode).left; 

        let maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.parentNode.offsetHeight;
        let maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.parentNode.offsetWidth;

        console.log('translateY',translateY,"maxBeyondY",maxBeyondY)
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
        return React.cloneElement(child,Object.assign({},child.props,{
            onTouchStart:this.handleTouchStart.bind(this),
            onTouchMove:this.handleTouchMove.bind(this),
            onTouchEnd:this.handleTouchEnd.bind(this),
        }))
    }
}

Slidable.defaultProps = {
    axis:"y",
    touchEnd:()=>{}
}

export default Slidable;