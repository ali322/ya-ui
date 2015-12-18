'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import dom from "../lib/dom.es6";

class Slidable extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
            transformStyle:{}
        }
    }
    handleTouchStart(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchX = clientX;
        this.startTouchY = clientY;
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
        let lastY = (this.offsetY === undefined) ? 0 : this.offsetY;
        let lastX = (this.offsetX === undefined) ? 0 : this.offsetX;
        this.offsetY = this.endTouchY - this.startTouchY;
        this.offsetX = this.endTouchX - this.startTouchX;
        this.restoreTranslate();
    }
    handleTouchMove(e){
        e && e.preventDefault();
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            // return;
        }
        const moveX = this.startTouchX - clientX;
        const moveY = this.startTouchY - clientY;

        // console.log('startTouchY',this.startTouchY,'currentY',clientY)
        this.transitionTouch(moveX,moveY)
    }
    restoreTranslate(){
        const {axis} = this.props;
        let transform = null;
        let translateNode = ReactDOM.findDOMNode(this);
        let beyondY = dom.offset(translateNode.parentNode).top - dom.offset(translateNode).top; 
        let beyondX = dom.offset(translateNode.parentNode).left - dom.offset(translateNode).left; 
        // console.log('beyondY',beyondY,"beyondX",beyondX)

        if(beyondX < 0 || beyondY < 0){
            transform = `translate3D(0,0,0)`;
        }
        let maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.parentNode.offsetHeight;
        let maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.parentNode.offsetWidth;
        if(beyondY > maxBeyondY && axis === "y"){
            let translateY = window.px2rem ? window.px2rem(maxBeyondY) + "rem": `${maxBeyondY}px`;
            transform = `translate3D(0,-${translateY},0)`;
        }else if(beyondX > maxBeyondX && axis === "x"){
            let translateX = window.px2rem ? window.px2rem(maxBeyondX) + "rem": `${maxBeyondX}px`;
            transform = `translate3D(-${translateX},0,0)`;
        }
        if(transform !== null){
            this.setState({
                transformStyle:{
                    transform,
                    transitionDuration:".3s"
                }
            })
        }
    }
    transitionTouch(moveX,moveY){
        const {axis} = this.props;
        let child = React.Children.only(this.props.children);
        const count = child.props.children.length;
        var transform = null;
        if(axis === "y" && moveY !== 0){
            let offsetY = this.offsetY === undefined ? 0: this.offsetY; 
            // console.log('moveY',moveY,'offsetY',offsetY)
            if((offsetY - moveY) > 0){
                // return
            }
            let translateY = offsetY - moveY;
            translateY = window.px2rem ? window.px2rem(translateY) + "rem": `${translateY}px`;
            transform = `translate3D(0,${translateY},0)`;
        }else if(axis === "x" && moveX !== 0){
            let offsetX = this.offsetX === undefined ? 0: this.offsetX;
            let translateX = offsetX - moveX
            translateX = window.px2rem ? window.px2rem(translateX) + "rem" : `${translateX}px`;
            transform = `translate3D(${translateX},0,0)`;
        }
        if(transform !==null){
            this.setState({
                transformStyle:{
                    transform,
                    transitionDuration:".3s"
                }
            })
        }
    }
    render(){
        let child = React.Children.only(this.props.children);
        return React.cloneElement(child,Object.assign({},child.props,{
            onTouchStart:this.handleTouchStart.bind(this),
            onTouchMove:this.handleTouchMove.bind(this),
            onTouchEnd:this.handleTouchEnd.bind(this),
            style:this.state.transformStyle
        }))
    }
}

Slidable.defaultProps = {
    axis:"y",
    touchEnd:()=>{}
}

export default Slidable;