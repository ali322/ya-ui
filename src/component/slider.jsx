'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class Slider extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:this.props.defaultActiveIndex !== undefined ? this.props.defaultActiveIndex : 0,
            prevActiveIndex:null,
            direction:null
        }
        this.slidesStyle = {};
        this.paused = false;
    }
    componentDidMount(){
        this.initialize();
        this.props.autoPlay && this.slideToNext();
    }
    initialize(){
        if(this.props.animationType === "scrollX"){
            const pseudoNode = React.cloneElement(this.props.children[0],{
                pseudo:true
            });
            this.props.children.push(pseudoNode);

            const slideNode = React.findDOMNode(this).querySelector(".slides").firstChild;
            const slidesWidth = slideNode.offsetWidth * React.Children.count(this.props.children);
            this.slidesStyle = {
                width:slidesWidth + "px",
                transitionProperty:"transform",
                transitionTimingFunction:"ease-in-out",
                // transitionDelay:delay+"s"
            };
            this.slideStyle = {
                width:slideNode.offsetWidth
            };
        }
        this.slidesCount = React.Children.count(this.props.children);
    }
    slideToNext(){
        this.timeout = setTimeout(this.next.bind(this),this.props.delay);
    }
    needPseudoNode(){
        return this.props.animationType === "scrollX";
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
        console.log('onMouseOver')
        if (this.props.pauseOnHover) {
          this.pause();
        }
    }
    handleMouseOut(){
        console.log('onMouseOut')
        if(this.paused === true){
            this.play();
        }
    }
    next(e){
        e && e.preventDefault();
        // console.log(e.isDefaultPrevented());
        // e.stopProgapation();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex + 1;
        const count = this.slidesCount;
        if(nextIndex > count - 1){
            if(!this.props.loop){
                return;
            }
            nextIndex = 0;
        }
        this.handleSelect(nextIndex,"next");
        clearTimeout(this.timeout);
        if(this.needPseudoNode() === true && prevIndex === count - 1 
            && this.paused === false){
            this.timeout = setTimeout(this.next.bind(this),10)
        }else{
            this.timeout = setTimeout(this.next.bind(this),this.props.delay);
        }
    }
    prev(e){
        e && e.preventDefault();
        const prevIndex = this.getActiveIndex();
        var nextIndex = prevIndex - 1;
        const count = this.slidesCount;
        if(nextIndex < 0){
            if(!this.props.loop){
                return;
            }
            nextIndex = count;
        }
        this.handleSelect(nextIndex,'prev')
        clearTimeout(this.timeout);
        if(this.needPseudoNode() === true && prevIndex === count - 1 
            && this.paused === false){
            this.timeout = setTimeout(this.prev.bind(this),10)
        }else{
            this.timeout = setTimeout(this.prev.bind(this),this.props.delay)   
        }
    }
    handleSelect(index,direction,e){
        e && e.preventDefault();
        // console.log('handleSelect',index,direction)
        const prevActiveIndex = this.getActiveIndex();
        this.setState({
            activeIndex:index,
            prevActiveIndex,
            direction
        });
    }
    getActiveIndex(){
        return this.props.activeIndex !== undefined ? this.props.activeIndex : this.state.activeIndex;
    }
    renderItem(child,index){
        const activeIndex = this.getActiveIndex();
        // console.log('render',activeIndex,index)
        const isActive = (index === activeIndex);
        const isPrevActive = this.state.prevActiveIndex !== null && this.state.prevActiveIndex === index;
        return React.cloneElement(child,{
            active:isActive,
            key:child.key ? child.key:index,
            style:this.slideStyle,
            animateOut:isPrevActive,
            animateIn:isActive && this.state.prevActiveIndex !== null,
            direction:this.state.direction
        })
    }
    renderDirectionNav(){
        return (
            <div className="direction-nav">
            <div className="direction-nav-prev" onClick={this.prev.bind(this)}><span className="iconfont icon-left-open"></span></div>
            <div className="direction-nav-next" onClick={this.next.bind(this)}><span className="iconfont icon-right-open"></span></div>
            </div>
        )
    }
    renderControlNav(){
        if(this.props.controlNav !== null){
            var activeIndex = this.getActiveIndex();
            if(this.needPseudoNode() === true && activeIndex === this.slidesCount - 1){
                activeIndex = 0;
            }
            const children = React.Children.map(this.props.children,(child,i)=>{
                if(this.needPseudoNode() === true && i === this.slidesCount - 1){
                    return;
                }
                // console.log('activeIndex',activeIndex,"i",i)
                const childrenClasses = classNames({
                    active:activeIndex === i
                })
                return (
                    <span onClick={this.handleSelect.bind(this,i,null)} className={childrenClasses}>
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
    transitionSlides(){
        if(this.state.prevActiveIndex === null){
            return;
        }
        if(this.props.animationType === "scrollX"){
            const activeIndex = this.getActiveIndex();
            // const slideNode = this.slideNode;
            const scrollX = this.slideStyle.width * activeIndex;
            // const scrollX = 0;

            var transform;
            if(activeIndex === 0){
                transform = "translate3D(0,0,0)";
                this.slidesStyle = Object.assign({},this.slidesStyle,{
                    transform,
                    transitionDuration:"0s"
                });
            }else{
                const speed = this.props.speed / 1000;
                transform = "translate3D(-"+ scrollX +"px,0,0)";
                this.slidesStyle = Object.assign({},this.slidesStyle,{
                    transform,
                    transitionDuration:speed+"s"
                })
            }
        }
    }
    render(){
        var classes = classNames({
            "slide":true
        });
        // console.log(this.slidesStyle)
        this.transitionSlides();
        return (
            <div className={classes} 
            onMouseOver={this.handleMouseOver.bind(this)} 
            onMouseOut={this.handleMouseOut.bind(this)}>
            <div className="slides" style={this.slidesStyle}>
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
    autoPlay:true,
    loop:true,
    speed:500,
    delay:3000,
    pauseOnHover:true
}

export default Slider;