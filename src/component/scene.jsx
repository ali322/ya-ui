'use strict';
import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames"
import {browserVersion} from "../../lib/dom/browserDetector.es6";
import rAF from "../../lib/dom/rAF";

export class SceneGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentScene:props.defaultScene,
            prevScene:null
        }
    }
    handleChange(scene,param,e){
        let prevScene = this.state.currentScene
        this.setState({
            currentScene:scene,
            prevScene
        },()=>{
            rAF(()=>{this.transitionWithGroup()})
            setTimeout(()=>this.props.onChange(scene,param,prevScene),300)
        })
    }
    transitionWithGroup(){
        let orientation = null
        const{currentScene,prevScene} = this.state
        if(currentScene !== this.props.defaultScene){
            orientation = "forward"
        }else if((currentScene === this.props.defaultScene) && prevScene !== null){
            orientation = "backward"
        }
        if(!orientation){
            return
        }
        const groupNode = ReactDOM.findDOMNode(this.refs["groupNode"])
        const prevNode = ReactDOM.findDOMNode(this.refs["prevNode"])
        const activeNode = ReactDOM.findDOMNode(this.refs["activeNode"])
        activeNode.style.WebkitTransform = "translate3D(100%,0,0)"
        prevNode.style.display = "block"
        if(orientation === "backward"){
            activeNode.style.WebkitTransform = "translate3D(-100%,0,0)"
        }
        let timerDelay = 600
        let transitionDuration = "0.5s"
        if(browserVersion().ios){
            transitionDuration = "0.4s"
            timerDelay = 500
        }
        let translateX = orientation === "forward"?"-100%":"100%"
        groupNode.style.WebkitTransform = `translate3D(${translateX},0,0)`
        groupNode.style.transitionDuration = transitionDuration
        groupNode.style.transitionTimingFunction = "cubic-bezier(0.42, 0, 0.58, 1.0)"

        const processTimer = setTimeout(()=>{
            groupNode.style.WebkitTransform = ""
            groupNode.style.transitionDuration = ""
            groupNode.style.transitionTimingFunction = ""
            activeNode.style.WebkitTransform = ""
            prevNode.style.display = ""
            clearTimeout(processTimer)
        },timerDelay)
    }
    resetScene(){
        this.setState({
            currentScene:this.props.defaultScene,
            prevScene:null
        })
    }
    renderScene(child,i){
        const {currentScene,prevScene} = this.state;
        const {name} = child.props;
        let refName = null
        if(currentScene === name){
            refName = "activeNode"
        }else if(prevScene === name){
            refName = "prevNode"
        }
        return React.cloneElement(child,Object.assign({},child.props,{
            active:currentScene === name,
            prev:prevScene === name,
            ref:refName,
            resetScene:this.resetScene.bind(this),
            changeScene:this.handleChange.bind(this),
            key:i
        }))
    }
    render(){
        const {currentScene,prevScene} = this.state;
        const leftToRight = (currentScene !== this.props.defaultScene)
        const rightToLeft = ((currentScene === this.props.defaultScene) && prevScene !== null)
        const classes = classNames("scene-group-inner",{
            "animation-disabled":this.state.prevScene === null,
            "left-to-right":leftToRight,
            "right-to-left":rightToLeft
        })
        return (
            <div className="scene-group">
            <div className={classes} ref="groupNode">{React.Children.map(this.props.children,this.renderScene.bind(this))}</div>
            </div>
        )
    }
}

SceneGroup.defaultProps = {
    defaultScene:"index",
    onChange:()=>{}
}

export class Scene extends Component{
    render(){
        const {key,active,prev,changeScene,resetScene,scrollable,refName} = this.props;
        const classes = classNames("scene",{
            scrollable,
            active,
            prev
        })
        let child = React.Children.only(this.props.children)
        child = React.cloneElement(child,Object.assign({},child.props,{
            changeScene,
            resetScene,
            active
        }))
        return (
            <div className={classes} key={key} ref={refName}>{child}</div>
        )
    }
}

Scene.defaultProps = {
    scrollable:true
}