'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Slidable from "./slidable.jsx";

export class SlideTabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex
        }
    }
    handleSelect(i,e){
        this.setState({
            activeIndex
        },()=>this.props.onSelect())
    }
    componentDidMount(){
        this.initialize()
    }
    initialize(){
        let contentNode = ReactDOM.findDOMNode(this.refs["content"])
        // let navbarNode = ReactDOM.findDOMNode(this.refs["navbar"])
        let contentNodeWidth = contentNode.offsetWidth * contentNode.children.length
        // let navbarNodeWidth = navbarNode.offsetWidth * navbarNode.children.length / 3
        contentNode.style.width = `${contentNodeWidth}px`
        // navbarNode.style.width = `${navbarNodeWidth}px`
        // console.log('itemWidth',itemWidth,"navWidth",navWidth)
    }
    renderNavbar(){
        let navigators = [];
        React.Children.forEach(this.props.children,(child,i)=>{
            const {navigator} = child.props;
            let classes = classNames("slide-tabs-navbar-item",{
                active:(i === this.state.activeIndex)
            })
            navigators.push(
                <div className={classes} key={i}>{navigator()}</div>
            )
        })
        return (
            <Slidable axis="x" ref="navbar">
                <div className="slide-tabs-navbar">{navigators}</div>
            </Slidable>
        )
    }
    renderTabsItem(child,index){
        return React.cloneElement(child,Object.assign({},child.props,{
            active:(index === this.state.activeIndex),
            key:index
        }))
    }
    render(){
        return (
            <div className="slide-tabs">
            <Slidable axis="x">
            <div className="slide-tabs-content" ref="content">{React.Children.map(this.props.children,this.renderTabsItem.bind(this))}</div>
            </Slidable>
            {this.renderNavbar()}
            </div>
        )
    }
}

SlideTabs.defaultProps = {
    activeIndex:0,
    onSelect:()=>{}
}

export class SlideTabsItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {key,active} = this.props;
        const classes = classNames("slide-tabs-item",{
            active
        })
        return (
            <div className={classes} key={key}>{this.props.children}</div>
        )
    }
}
