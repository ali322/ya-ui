'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

class Image extends Component{
    constructor(props){
        super(props);
        this.state = {
            isReady:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.inViewport === true){
            if(this._timer){
                clearTimeout(this._timer);
            }
            this._timer = setTimeout(()=>{
                this.setState({
                    isReady:true
                })
            },500);
        }
    }
    componentWillUnmount(){
        if(this._timer){
            clearTimeout(this._timer);
        }
    }
    componentDidMount(){
        var imgNode = ReactDOM.findDOMNode(this);
        this.initialHeight = imgNode.clientWidth;
    }
    render(){
        const classes = classNames({
            "loaded":this.state.isReady
        })
        let src = this.props.placeholder;
        if(this.state.isReady === true){
            src = this.props.src;
        }
        const initialStyle = {
            // height:this.initialHeight
        };
        return (
            <div key={src} style={initialStyle} className="lazyload">
                <img src={src} className={classes}/>
             </div>
        )
    }
}

Image.defaultProps = {
    inViewport:false,
    placeholder:"/asset/image/placeholder-500x500.png"
}

export default Image;