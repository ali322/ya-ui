'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import dom from "../lib/dom.es6";

class ScrollNav extends Component{
    checkVisible(element,relativeElement){
        const paddingTop = relativeElement.firstChild.offsetTop
        const offsetTop = element.offsetTop - paddingTop;
        const scrollTop = relativeElement.scrollTop;
        const offsetHeight = element.offsetHeight;
        // console.log(offsetTop,scrollTop,paddingTop)
        return offsetTop <= scrollTop && 
                (offsetTop + offsetHeight) >= scrollTop
    }
    handleScroll(){
        var visibleNodes = [],activeAnchorNodes = [];
        let navbarNodes = ReactDOM.findDOMNode(this).querySelector(this.props.navbar).children;
        React.Children.forEach(this.props.children,(child,i)=>{
            let childNode = ReactDOM.findDOMNode(child);
            if(this.checkVisible(childNode,ReactDOM.findDOMNode(this)) === true){
                visibleNodes.push(linkedNode);
                activeAnchorNodes.push(anchorNodes[i]);
            }
        })
        if(visibleNodes.length === 0){
            return false;
        }
        Array.prototype.forEach.call(navbarNodes,(navbarNode)=>{
            dom.removeClass(navbarNode,"active");
        });
        dom.addClass(navbarNodes[0],"active");        
    }
    render(){
        const classes = classNames(this.props.className,"scroll-nav");
        return (
            <div className={classes} 
            onScroll={this.handleScroll.bind(this)}>
            {this.props.children}
            </div>
        );
    }
}

export class ScrollNavbar extends Component{
    renderScrollAnchors(){
        let anchors = [];
        Array.prototype.forEach.call(this.props.children,(child)=>{
            anchors.push(
                <div className="scroll-navbar-anchor">{child}</div>
            )
        })
    }
    render(){
        // let child = React.Children.only(this.props.children);
        return (
            <div className="scroll-navbar">
            {this.renderScrollAnchors()}
            </div>
        )
    }
}

export default ScrollNav;