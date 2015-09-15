'use strict';

import React,{Component} from "react";
import classNames from "classnames";

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
    }
    componentDidMount(){
        this.initialize();
        this.props.autoPlay && this.slideToNext();
    }
    initialize(){
        const {animationType} = this.props;
        if(this.needPseudoNode() === true){
            const count = React.Children.count(this.props.children);
            const pseudoFirstNode = React.cloneElement(this.props.children[0],{
                key:"pseudo-first",
                pseudo:true
            });
            const pseudoLastNode = React.cloneElement(this.props.children[count-1],{
                key:"pseudo-last",
                pseudo:true
            });
            this.props.children.push(pseudoFirstNode);
            this.props.children.unshift(pseudoLastNode);
            const slideNode = React.findDOMNode(this).querySelector(".slides").firstChild;
            const slidesWidth = slideNode.offsetWidth * React.Children.count(this.props.children);
            const slidesHeight = slideNode.offsetHeight * React.Children.count(this.props.children);
            const transform = this.props.animationType === "scrollX"?
                "translate3D(-"+slideNode.offsetWidth+"px,0,0)":"translate3D(0,-"+slideNode.offsetHeight+"px,0)";
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
        this.timeout = setTimeout(function interval(){
            const prevIndex = self.getActiveIndex();
            const count = React.Children.count(this.props.children);
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
    next(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex + 1;
        const count = React.Children.count(this.props.children);
        if(nextIndex > count - 1){
            if(!this.props.loop){
                return;
            }
            nextIndex = 0;
        }
        this.handleSelect(nextIndex,count,"next");
    }
    prev(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex - 1;
        const count = React.Children.count(this.props.children);
        if(nextIndex < 0){
            if(!this.props.loop){
                return;
            }
            nextIndex = count - 1;
        }
        this.handleSelect(nextIndex,count,'prev')
    }
    handleSelect(index,count,direction,e){
        e && e.preventDefault();
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
        }))
    }
    transitionSlides(state,props,direction){
        if(state.prevActiveIndex === null){
            return;
        }
        const {animationType} = props;
        const count = React.Children.count(this.props.children);
        const activeIndex = state.activeIndex;
        if(this.needPseudoNode() === true){
            var transform,slidesStyle = this.state.slidesStyle;
            var symbol = direction === "prev"?"-":"-";
            // console.log("direction",direction)
            // console.log('prevActiveIndex',state.prevActiveIndex)
            // console.log('activeIndex',activeIndex)
            // console.log('nextActiveIndex',state.nextActiveIndex)
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
    componentDidUpdate(){
        const count = React.Children.count(this.props.children);
        const nextTick = this.props.speed + 10;
        if(this.needPseudoNode() === true){
            if(this.getActiveIndex() === (count - 1) 
                && this.state.direction === "next"
                // && this.state.prevActiveIndex !== 0
                ){
                // if direction is next and should active is pseudo item then redirect to the first real item
                setTimeout(this.next.bind(this),nextTick)
                // console.log('updated',this.state.activeIndex)
            }else if(this.getActiveIndex() === 0 
                && this.state.direction === "prev"
                ){
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
            const slidesCount = React.Children.count(this.props.children);
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
            onMouseOver={this.handleMouseOver.bind(this)} 
            onMouseOut={this.handleMouseOut.bind(this)}>
            <div className="slides" style={this.state.slidesStyle}>
            {React.Children.map(this.props.children,this.renderItem.bind(this))}
            </div>
            {this.renderControlNav()}
            {this.renderDirectionNav()}
            </div>
        )
    }
}

Slider.defaultProps = {
    directionNav:true,
    controlNav:true,
    animationType:"scrollX",
    direction:"next",
    autoPlay:false,
    loop:true,
    speed:500,
    delay:3000,
    pauseOnHover:true
}

export default Slider;