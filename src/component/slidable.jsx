'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import dom from "../lib/dom";
import rAF from "../lib/dom/requestAnimationFrame";
import _ from "lodash"

class Slidable extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex,
        }
        this.translateX = 0;
        this.translateY = 0;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== this.props.activeIndex && 
            nextProps.activeIndex !== this.state.activeIndex){
            let prevIndex = this.state.activeIndex
            this.setState({
                activeIndex:nextProps.activeIndex
            },()=>{
                this.transitionInView(prevIndex)
            })
        }
    }
    transitionInView(prevIndex){
        const {activeIndex} = this.state;
        const {axis,pinMode,animateDuration} = this.props;
        const itemNode = ReactDOM.findDOMNode(this).firstChild
        const itemNodeWidth = itemNode.offsetWidth;
        const itemNodeHeight = itemNode.offsetHeight;
        const translateNodeWidth = ReactDOM.findDOMNode(this).parentNode.parentNode.offsetWidth
        const translateNodeHeight = ReactDOM.findDOMNode(this).parentNode.parentNode.offsetHeight
        if(axis === "y"){
            let translateY = (activeIndex * itemNode.offsetHeight) > 0 ?
            - (activeIndex * itemNode.offsetHeight) :0;
            if(!pinMode){
                if(this.translateY < translateY 
                /*&& this.translateY > (translateY - itemNodeHeight)*/){
                    // console.log('left edge')
                    this.translateY = translateY
                }
                if(/*translateNodeHeight > (this.translateY - translateY) &&*/
                    translateNodeHeight < (this.translateY - translateY + itemNodeHeight)){
                    // console.log('right edge')
                    this.translateY = this.translateY - (this.translateY - translateY + itemNodeHeight - translateNodeHeight)
                    // console.log(this.translateY)
                }
            }
        }else{
            let translateX = (activeIndex * itemNode.offsetWidth) > 0 ?
            - (activeIndex * itemNode.offsetWidth) :0;
            if(!pinMode){
                if(this.translateX < translateX
                /*&& this.translateX > (translateX - itemNodeWidth)*/){
                    // console.log('left edge')
                    this.translateX = translateX
                }
                if(/*translateNodeWidth > (this.translateX - translateX) && */
                    translateNodeWidth < (this.translateX - translateX + itemNodeWidth)){
                    // console.log('right edge')
                    this.translateX = this.translateX - (this.translateX - translateX + itemNodeWidth - translateNodeWidth)
                    // console.log(this.translateX)
                }
            }
        }
        this.checkBound()
        if(this.props.simulateTranslate === true){
            // console.log('simulateTranslate')
            if(axis === "x"){
                let tempX = this.translateX
                if(prevIndex < activeIndex){
                    this.translateX += itemNodeWidth
                }else{
                    this.translateX -= itemNodeWidth
                }
                this.transitionTouch(0)
                this.translateX = tempX
            }else{
                let tempY = this.translateY
                if(prevIndex < activeIndex){
                    this.translateY += itemNodeHeight
                }else{
                    this.translateY -= itemNodeHeight
                }
                this.transitionTouch(0)
                this.translateY = tempY
            }
            setTimeout(()=>{
                this.transitionTouch(0.3)
            },100)
            // rAF(this.transitionTouch.bind(this,animateDuration))
        }else{
            this.transitionTouch(animateDuration)
        }
    }
    handleTouchStart(e){
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        const {axis} = this.props;
        this.startTouchTime = Date.now();
        this.startTouchY = clientY;
        this.startTouchX = clientX;
        this.lastY = this.startTouchY;
        this.lastX = this.startTouchX;
        this.moveDirection = null;
    }
    handleTouchEnd(e){
        e && e.stopPropagation();
        const {clientY,clientX} = e.changedTouches[0];
        if(this.startTouchX !== clientX || this.startTouchY !== clientY){
            const {axis,animateDuration,thresholdOfChange} = this.props;
            this.endTouchY = clientY;
            this.endTouchX = clientX;
            const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
            if(this.props.onlyInside && !inTouchableRegion){
                return;
            }
            // if(this.props.handleActiveChange === false){
            //     return;
            // }
            // let touchDirection = Math.abs(this.endTouchX - this.startTouchX) > Math.abs(this.endTouchY - this.startTouchY) ?
            // "x":"y";
            if(this.moveDirection !== axis){
                return;
            }
            let activeIndex = this.state.activeIndex;
            let itemNode = ReactDOM.findDOMNode(this).firstChild
            if(axis === "y"){
                let itemHeight = itemNode.offsetHeight;
                // let activeIndex = Math.abs(this.translateY) / itemHeight
                let step = (this.endTouchY - this.startTouchY) / itemHeight
                // activeIndex = (Math.abs(step) > thresholdOfChange && step < 0) ? Math.ceil(activeIndex):Math.floor(activeIndex)
                // activeIndex = (Math.abs(step) > thresholdOfChange && step > 0) ? Math.floor(activeIndex):Math.ceil(activeIndex)
                if(Math.abs(step) > thresholdOfChange){
                    if(step > 0){
                        activeIndex -= 1
                    }else if(step < 0){
                        activeIndex += 1
                    }
                }
                if(this.lastY !== this.startTouchY && activeIndex !== this.state.activeIndex){
                    this.setState({
                        activeIndex:activeIndex
                    },()=>this.props.handleActiveChange(activeIndex))
                }
                this.translateY = (activeIndex * itemNode.offsetHeight) > 0 ?
                - (activeIndex * itemNode.offsetHeight) :0;
            }else if(axis === "x"){
                let itemWidth = itemNode.offsetWidth;
                // let activeIndex = Math.abs(this.translateX) / itemWidth
                let step = (this.endTouchX - this.startTouchX) / itemWidth
                if(Math.abs(step) > thresholdOfChange){
                    if(step > 0){
                        activeIndex -= 1
                    }else if(step < 0){
                        activeIndex += 1
                    }
                }
                // activeIndex = (Math.abs(step) > thresholdOfChange && step < 0) ? Math.ceil(activeIndex):Math.floor(activeIndex)
                // activeIndex = (Math.abs(step) > thresholdOfChange && step > 0) ? Math.floor(activeIndex):Math.ceil(activeIndex)
                console.log('step',step,activeIndex)
                if(this.lastX !== this.startTouchX && activeIndex !== this.state.activeIndex){
                    this.setState({
                        activeIndex:activeIndex
                    },()=>this.props.handleActiveChange(activeIndex))
                }
                this.translateX = (activeIndex * itemNode.offsetWidth) > 0 ?
                - (activeIndex * itemNode.offsetWidth) :0;
            }
            this.checkBound()
            // console.log('this.translateX',Math.abs(this.endTouchX - this.startTouchX),Math.abs(this.endTouchY - this.startTouchY))
            // console.log('translateY',this.translateY)
            // this.transitionTouch(this.props.animateDuration)
            // if(this.touchDirection() === axis){
            let transitionTouch = this.transitionTouch.bind(this,animateDuration)
            // this.timeout = setTimeout(()=>{
            //     transitionTouch()
            //     clearTimeout(this.timeout)
            // },10)
            transitionTouch()
            // rAF(this.transitionTouch.bind(this,animateDuration))
            dom.removeClass(ReactDOM.findDOMNode(this),"sliding")
        }
    }
    handleTouchMove(e){
        e && e.preventDefault()
        e && e.stopPropagation();
        const {animateDuration,axis} = this.props;
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = dom.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(this.props.onlyInside && !inTouchableRegion){
            return;
        }
        let moveY = Math.abs(clientY - this.startTouchY);
        let moveX = Math.abs(clientX - this.startTouchX);
        if(axis === "x" && moveX < 3){
            // return
        }else if(axis === "y" && moveY < 3){
            // return
        }
        let touchAngle = Math.atan2(moveY,moveX) * 180 / Math.PI
        // console.log('touchAngle',touchAngle,moveY,moveX)
        let moveDirection = touchAngle < 15 ?"x":"y"
        // let moveDirection =  moveY > moveX ?"y":"x"
        if(this.moveDirection && this.moveDirection !== moveDirection){
            return
        }
        this.moveDirection = moveDirection
        if(this.moveDirection === axis){
            dom.addClass(ReactDOM.findDOMNode(this),"sliding")
            // e && e.preventDefault()
        }
        if(axis === "y" && this.moveDirection === "y"){
            this.translateY += (clientY - this.lastY)
        }else if(axis === "x" && this.moveDirection === "x"){
            this.translateX += (clientX - this.lastX)
        }

        this.translateY = this.translateY >= 0 ? 0 : this.translateY;
        this.translateX = this.translateX >= 0 ? 0 : this.translateX;
        this.checkBound(()=>{
            this.lastY = clientY;
            this.lastX = clientX;
        })
        if(this.props.transitionMove === true){
            let transitionTouch = this.transitionTouch.bind(this,animateDuration)
            // console.log('this.translateX',(clientX - this.lastX),this.translateX)
            if(this.touchMoving){
                return
            }
            this.touchMoving = true
            this.timeout = setTimeout(()=>{
                transitionTouch()
                this.touchMoving = false
                clearTimeout(this.timeout)
            },30)
            // _.throttle(transitionTouch,60)
        }
    }
    checkBound(callback = ()=>{}){
        const {axis} = this.props;
        let {translateY,translateX} = this
        let translateNode = ReactDOM.findDOMNode(this);
        let maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.offsetHeight;
        let maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.offsetWidth;
        if(maxBeyondY < 0 && axis === "y"){
            // console.log('cant translateY')
            this.translateY = 0
        }
        if(maxBeyondX < 0 && axis === "x"){
            this.translateX = 0
        }
        if(maxBeyondY <= (- this.translateY) && maxBeyondY > 0 && axis === "y"){
            this.translateY = - maxBeyondY
        }else if(maxBeyondX <= (- this.translateX) && maxBeyondX > 0 && axis === "x"){
            this.translateX = - maxBeyondX
        }else{
            callback()
        }
    }
    transitionTouch(duration){
        const {axis} = this.props;
        let {translateY,translateX} = this
        var transform = null;
        if(axis === "y"){
            translateY = window.px2rem ? window.px2rem(translateY) + "rem": `${translateY}px`;
            transform = `translate3D(0,${translateY},0)`;
        }else if(axis === "x"){
            translateX = window.px2rem ? window.px2rem(translateX) + "rem" : `${translateX}px`;
            transform = `translate3D(${translateX},0,0)`;
        }
        if(transform !==null){
            let translateNode = ReactDOM.findDOMNode(this);
            translateNode.style.transitionDuration = `${duration}s`;
            translateNode.style.WebkitTransform = transform;
        }
    }
    render(){
        let child = React.Children.only(this.props.children);
        // console.log('activeIndex',this.state.activeIndex)
        return React.cloneElement(child,Object.assign({},child.props,{
            onTouchStart:this.handleTouchStart.bind(this),
            onTouchMove:this.handleTouchMove.bind(this),
            onTouchEnd:this.handleTouchEnd.bind(this),
            active:this.state.activeIndex,
            style:Object.assign({},this.props.style,{
                // transitionDuration:`${this.props.animateDuration}s`,
                transitionProperty:"transform"
            })
        }))
    }
}

Slidable.defaultProps = {
    activeIndex:0,
    onlyInside:false,
    axis:"y",
    thresholdOfChange:0.3,
    animateDuration:0.3,
    pinMode:false,
    transitionMove:true,
    simulateTranslate:false,
    handleActiveChange:()=>{}
}

export default Slidable;