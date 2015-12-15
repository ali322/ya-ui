'use strict'

import React,{Component} from "react";
import ReactDOM from "react-dom";
import {ReactCSSTransitionGroup} from "react/lib/ReactCSSTransitionGroup";

class Image extends Component{
    constructor(props){
        super(props);
        this.state = {
            isReady:false
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible === true){
            setTimeout(()=>{
                this.setState({
                    isReady:true
                })
            },500);
        }
    }
    componentDidMount(){
        var imgNode = ReactDOM.findDOMNode(this);
        this.initialHeight = imgNode.clientWidth;
    }
    render(){
        var src = this.props.placeholder,classes="",transition="flip";
        if(this.state.isReady === true){
            src = this.props.src;
            classes="loaded";
        }
        const initialStyle = {
            height:this.initialHeight
        };
        return (
             <div key={src} style={initialStyle} className="lazyload">
                <img src={src} className={classes}/>
             </div>
        )
    }
}

Image.defaultProps = {
    placeholder:"/asset/image/placeholder-500x500.png"
}

export default Image;