'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import dom from "../../lib/dom.es6";

React.initializeTouchEvents(true);

class Slider extends Component{
    constructor(props){
        super(props);
        const defaultActiveIndex = this.needPseudoNode()?1:0;
        this.state = {
            activeIndex:this.props.defaultActiveIndex !== undefined ?this.props.defaultActiveIndex:defaultActiveIndex,
            prevActiveIndex:null,
            nextActiveIndex:null,
            direction:null,
            slidesStyle:null,
            slideStyle:null,
            sliderStyle:null
        }
        this.paused = false;
        this.slides = null;
    }
    componentDidMount(){
        this.initialize();
        this.props.autoPlay && this.slideToNext();
    }
    componentWillMount(){
        this.slides = this.props.children;
        if(this.needPseudoNode() === true){
            const count = this.slides.length;
            const pseudoFirstNode = React.cloneElement(this.slides[0],{
                key:"pseudo-first",
                pseudo:true
            });
            const pseudoLastNode = React.cloneElement(this.slides[count-1],{
                key:"pseudo-last",
                pseudo:true
            });
            this.slides.push(pseudoFirstNode);
            this.slides.unshift(pseudoLastNode);
        }
    }
    initialize(){
        const {animationType} = this.props;
        const {activeIndex} = this.state;
        if(this.needPseudoNode() === true){
            const slideNode = React.findDOMNode(this).querySelector(".slides").firstChild;
            const slidesWidth = slideNode.offsetWidth * this.slides.length;
            const slidesHeight = slideNode.offsetHeight * this.slides.length;
            const transform = this.props.animationType === "scrollX"?
                "translate3D(-"+slideNode.offsetWidth*activeIndex+"px,0,0)":
                "translate3D(0,-"+slideNode.offsetHeight*activeIndex+"px,0)";
            this.setState({slidesStyle:{
                width:animationType === "scrollX"?slidesWidth + "px":null,
                height:animationType === "scrollY"?slidesHeight + "px":null,
                transitionProperty:"transform",
                transitionTimingFunction:"ease-in-out",
                transform
            }});
            this.setState({slideStyle:{
                width:animationType === "scrollX"?slideNode.offsetWidth:null,
                height:animationType === "scrollY"?slideNode.offsetHeight:null
            }});
            this.setState({sliderStyle:{
                height:animationType === "scrollY"?slideNode.offsetHeight:null
            }});
        }
    }
    slideToNext(){
        const self = this;
        const count = this.slides.length;
        this.timeout = setTimeout(function interval(){
            const prevIndex = self.getActiveIndex();
            self.next();
            clearTimeout(self.timeout);
            if(self.needPseudoNode() === true && prevIndex === count - 1 
                && self.paused === false){
                self.timeout = setTimeout(interval,10)
            }else{
                self.timeout = setTimeout(interval,self.props.delay);
            }
        },this.props.delay);
    }
    needPseudoNode(){
        return this.props.animationType === "scrollX" || this.props.animationType === "scrollY";
    }
    play(){
        this.paused = false;
        this.slideToNext();
    }
    pause(){
        this.paused = true;
        clearTimeout(this.timeout);
    }
    handleMouseOver(){
        // console.log('onMouseOver')
        if (this.props.pauseOnHover) {
          this.pause();
        }
    }
    handleMouseOut(){
        // console.log('onMouseOut')
        if(this.paused === true){
            this.play();
        }
    }
    handleTouchStart(e){
        const {clientY,clientX} = e.changedTouches[0];
        this.startTouchX = clientX;
        this.startTouchY = clientY;
        // console.log('touch start',e.changedTouches,e.targetTouches,e.touches)
    }
    handleTouchEnd(e){
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = this.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            // e.preventDefault();
            // return;
        }
        const offsetWidth = e.currentTarget.offsetWidth; 
        const offsetHeight = e.currentTarget.offsetHeight; 
        const {animationType} = this.props;
        var offsetY,offsetX;
        if(animationType === "scrollY"){
            offsetY = Math.abs(clientY) - Math.abs(this.startTouchY);
            const absOfOffsetY = Math.abs(offsetY);

            if(absOfOffsetY >= offsetHeight / 2){
                if(offsetY < 0){
                    // console.log('next Y')
                    setTimeout(this.next.bind(this),100);
                }else if(offsetY > 0){
                    // console.log('prev Y')
                    setTimeout(this.prev.bind(this),100);
                }
            }else{
                absOfOffsetY > 0 && this.restorePosition();
            }
        }
        if(animationType === "scrollX"){
            offsetX = Math.abs(clientX) - Math.abs(this.startTouchX);
            const absOfOffsetX = Math.abs(offsetX);
            // console.log('distance',Math.abs(clientX),Math.abs(this.startTouchX))
            if(absOfOffsetX >= offsetHeight / 2){
                if(offsetX < 0){
                    // console.log('next X');
                    setTimeout(this.next.bind(this),100);
                }else if(offsetX > 0){
                    // console.log('prev X');
                    setTimeout(this.prev.bind(this),100);
                }
            }else{
                absOfOffsetX > 0 && this.restorePosition()
            }
        }
    }
    handleTouchMove(e){
        const {clientY,clientX} = e.changedTouches[0];
        const inTouchableRegion = this.inTouchableRegion(clientX,clientY,e.currentTarget);
        if(!inTouchableRegion){
            e.preventDefault();
            return;
        }

        const offsetX = Math.abs(this.startTouchX) - Math.abs(clientX);
        const offsetY = Math.abs(this.startTouchY) - Math.abs(clientY);
        // console.log('currentX',clientX,'currentY',clientY)
        // console.log('lastX',this.lastMoveX,'lastY',this.lastMoveY)
        this.transitionTouch(offsetX,offsetY)
        this.lastMoveY = clientY;
        this.lastMoveX = clientX;
    }
    restorePosition(){
        // console.log('restorePosition')
        const slidesNode = React.findDOMNode(this.refs.slides);
        slidesNode.style.transform = this.state.slidesStyle.transform;
        slidesNode.style.transitionDuration = ".3s";
    }
    transitionTouch(offsetX,offsetY){
        const {animationType} = this.props;
        const count = this.slides.length;
        const activeIndex = this.getActiveIndex();
        var transform = null;
        if(animationType === "scrollY" && offsetY !== 0){
            var scrollY = this.state.slideStyle.height * activeIndex;
            scrollY += offsetY;
            transform = "translate3D(0,-"+scrollY+"px,0)";
        }else if(animationType === "scrollX" && offsetX !== 0){
            var scrollX = this.state.slideStyle.width * activeIndex;
            scrollX += offsetX;
            transform = "translate3D(-"+scrollX+"px,0,0)";
        }
        const slidesNode = React.findDOMNode(this.refs.slides);
        if(transform !==null){
            slidesNode.style.transform = transform;
            slidesNode.style.transitionDuration = ".3s";
        }
    }
    inTouchableRegion(x,y,element){
        const targetOffset = dom.offset(element);
        const minY = targetOffset.top;
        const maxY = targetOffset.top + element.offsetHeight;
        const minX = targetOffset.left;
        const maxX = targetOffset.left + element.offsetWidth;
        const isXValid = (x >= minX && x <= maxX);
        const isYValid = (y >= minY && y <= maxY);
        if(isXValid && isYValid){
            return true;
        }
        return false;
    }
    next(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex + 1;
        const count = this.slides.length;
        if(nextIndex > count - 1){
            if(!this.props.loop){
                return;
            }
            nextIndex = 0;
        }
        this.handleSelect(nextIndex,"next");
    }
    prev(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex - 1;
        const count = this.slides.length;
        if(nextIndex < 0){
            if(!this.props.loop){
                return;
            }
            nextIndex = count - 1;
        }
        this.handleSelect(nextIndex,'prev')
    }
    handleSelect(index,direction,e){
        e && e.preventDefault();
        const count = this.slides.length;
        var prevActiveIndex,nextActiveIndex;
        if(direction === "next"){
            // console.log('index',index)
            index = (this.needPseudoNode() && index === 0)?1:index;
            prevActiveIndex = index - 1,nextActiveIndex = index + 1;
            if(prevActiveIndex < 0){
                prevActiveIndex = count - 1;
            }
            if(nextActiveIndex >= count){
                nextActiveIndex = 0;
            }
        }
        if(direction === "prev"){
            index = (this.needPseudoNode() && index === (count - 1))?count - 2:index;
            // console.log('index',index,count)
            prevActiveIndex = index + 1,nextActiveIndex = index -1;
            if(nextActiveIndex < 0){
                nextActiveIndex = count - 1;
            }
            if(prevActiveIndex >= count){
                prevActiveIndex = 0;
            }
        }
        const state = {
            activeIndex:index,
            prevActiveIndex,
            nextActiveIndex,
            direction
        };
        const slidesStyle = this.transitionSlides(state,this.props,direction);
        // console.log(slidesStyle)
        this.setState(Object.assign({},state,{
            slidesStyle
        }),()=>{
            console.log('index will change',index)
            this.props.onChange(index);
        })
    }
    transitionSlides(state,props,direction){
        if(state.prevActiveIndex === null){
            return;
        }
        const {animationType} = props;
        const count = this.slides.length;
        const activeIndex = state.activeIndex;
        if(this.needPseudoNode() === true){
            var transform,slidesStyle = this.state.slidesStyle;
            var symbol = direction === "prev"?"-":"-";
            // console.log("direction",direction)
            console.log('prevActiveIndex',state.prevActiveIndex)
            console.log('activeIndex',activeIndex)
            console.log('nextActiveIndex',state.nextActiveIndex)
            // if direction is next and should active is pseudo item then redirect to the first real item
            if(activeIndex === 1&& state.direction === "next"){
                transform = animationType === "scrollX"?
                "translate3D(-"+this.state.slideStyle.width+"px,0,0)":
                "translate3D(0,-"+this.state.slideStyle.height+"px,0)";
                slidesStyle = Object.assign({},slidesStyle,{
                    transform,
                    transitionDuration:"0s"
                })
            // if direction is prev and should active is pseudo item then redirect to the last real item
            }else if(activeIndex === (count - 2) && state.direction === "prev"){
                transform = animationType === "scrollX"?
                "translate3D(-"+(this.state.slideStyle.width*activeIndex)+"px,0,0)":
                "translate3D(0,-"+(this.state.slideStyle.height*activeIndex)+"px,0)";
                slidesStyle = Object.assign({},slidesStyle,{
                    transform,
                    transitionDuration:"0s"
                })
            }else{
                const speed = props.speed / 1000;
                if(animationType === "scrollX"){
                    const scrollX = this.state.slideStyle.width * activeIndex;
                    transform = "translate3D("+ symbol + scrollX +"px,0,0)";
                }else if(animationType === "scrollY"){
                    const scrollY = this.state.slideStyle.height * activeIndex;
                    transform = "translate3D(0,"+ symbol + scrollY +"px,0)";
                }
                // console.log('transform',transform)
                slidesStyle = Object.assign({},slidesStyle,{
                    transform,
                    transitionDuration:speed+"s"
                })
            }
            return slidesStyle;
        }
    }
    componentDidUpdate(nextProps,nextState){
        const count = this.slides.length;
        const nextTick = this.props.speed + 10;
        if(this.needPseudoNode() === true){
            if(nextState.activeIndex === (count - 1) 
                && this.state.direction === "next"
                && this.state.activeIndex === nextState.activeIndex
                // && this.state.prevActiveIndex !== 0
                ){
                // if direction is next and should active is pseudo item then redirect to the first real item
                setTimeout(this.next.bind(this),nextTick)
            }else if(this.getActiveIndex() === 0 
                && this.state.direction === "prev" 
                && this.state.activeIndex !== nextState.activeIndex
                ){
                console.log('updated ---',nextState.activeIndex,this.state.activeIndex)
                // if direction is prev and should active is pseudo item then redirect to the last real item
                setTimeout(this.prev.bind(this),nextTick)
                // console.log('updated',this.state.activeIndex)
            }
        }
    }
    getActiveIndex(){
        return this.props.activeIndex !== undefined ? this.props.activeIndex : this.state.activeIndex;
    }
    renderItem(child,index){
        const activeIndex = this.getActiveIndex();
        const isActive = (index === activeIndex);
        const isPrevActive = this.state.prevActiveIndex !== null && this.state.prevActiveIndex === index;
        const isNextActive = this.state.nextActiveIndex !== null && this.state.nextActiveIndex === index;
        return React.cloneElement(child,{
            active:isActive,
            prev:isPrevActive,
            next:isNextActive,
            key:child.key ? child.key:index,
            style:this.state.slideStyle,
            animateOut:isPrevActive,
            animateIn:isActive && this.state.prevActiveIndex !== null,
            direction:this.state.direction
        })
    }
    renderDirectionNav(){
        if(this.props.directionNav === true){
            return (
                <div className="direction-nav">
                <div className="direction-nav-prev" onClick={this.prev.bind(this)}><span className="iconfont icon-left-open"></span></div>
                <div className="direction-nav-next" onClick={this.next.bind(this)}><span className="iconfont icon-right-open"></span></div>
                </div>
            )
        }
        return null;
    }
    renderControlNav(){
        if(this.props.controlNav === true){
            var activeIndex = this.getActiveIndex();
            const slidesCount = this.slides.length;
            if(this.needPseudoNode() === true){
                // if direction is next and should active is pseudo item then redirect to 1
                activeIndex = (activeIndex === slidesCount - 1)?1:activeIndex;
                // if direction is prev and should active is pseudo item then redirect to the last real item
                activeIndex = (activeIndex === 0)?(slidesCount - 2):activeIndex;
            }
            const children = React.Children.map(this.props.children,(child,i)=>{
                /* dont render pseudo control item*/
                if(this.needPseudoNode() === true && i === slidesCount - 1){
                    return;
                }
                if(this.needPseudoNode() === true && i === 0){
                    return;
                }
                // console.log('activeIndex',activeIndex,"i",i)
                const childrenClasses = classNames({
                    active:activeIndex === i
                })
                return (
                    <span onClick={this.handleSelect.bind(this,i,null)} className={childrenClasses} key={i}>
                    </span>
                )
            });
            const classes = classNames({
                'control-nav':true
            })
            return (
                <div className={classes}>{children}</div>
            )
        }
        return null
    }
    render(){
        var classes = classNames({
            "slide":true
        });
        // console.log('render',this.state.activeIndex)
        return (
            <div className={classes} 
            style={this.state.sliderStyle}
            onTouchStart={this.handleTouchStart.bind(this)}
            onTouchMove={this.handleTouchMove.bind(this)}
            onTouchEnd={this.handleTouchEnd.bind(this)}
            onMouseOver={this.handleMouseOver.bind(this)} 
            onMouseOut={this.handleMouseOut.bind(this)}>
            <div className="slides" style={this.state.slidesStyle} ref="slides">
            {React.Children.map(this.slides,this.renderItem.bind(this))}
            </div>
            {this.renderControlNav()}
            {this.renderDirectionNav()}
            </div>
        )
    }
}

Slider.defaultProps = {
    directionNav:false,
    controlNav:true,
    animationType:"scrollX",
    direction:"next",
    autoPlay:false,
    loop:true,
    speed:500,
    delay:3000,
    pauseOnHover:true,
    onChange:function(){}
}

export default Slider;